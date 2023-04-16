import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import {
  IUserPassword,
  UserPassword,
  UserPasswordDoc,
} from "../models/userPasswordModel";
import * as permissionsFile from "../DAL/permissionsFile";
import * as usersFile from "../DAL/usersFile";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  RequestWithUserPermissions,
  UserObject,
  UserPermissionsObject,
} from "../types/objectTypes";

export const getLoginPage: RequestHandler = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "auth/login",
    login: true,
  });
};

export const getSignupPage: RequestHandler = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Create An Account",
    path: "auth/login",
    login: false,
  });
};

export const postSignup: RequestHandler = async (req, res, next) => {
  try {
    // if there are validation errors
    const validationRes = validationResult(req);
    if (!validationRes.isEmpty()) {
      return res.status(422).json({
        errorMessage: validationRes.array()[0].msg,
      });
    }

    /*check that the user is exist
    if not exist, return error
    if user exist and have password, leave the password as is and return error
    if user exist and don't have password, create password and return success */
    const { userName, password } = req.body;
    console.log(req.body);
    const user: UserPasswordDoc | null = await UserPassword.findOne({
      userName: userName,
    });
    if (!user) {
      return res
        .status(422)
        .json({ errorMessage: "Invalid user name or password" });
    }

    if (user.password && user.password.length > 0) {
      //already have password
      return res
        .status(422)
        .json({ errorMessage: "User already have password" });
    }
    //create password
    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.BCRYPT_SALT!
    );
    user.password = hashedPassword;
    await user.save();
    return res.status(201).json({ message: "User created!" });
  } catch (error: any) {
    return next(error);
  }
};

export const postLogin: RequestHandler = async (req, res, next) => {
  //check validation errors
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(422).json({
      errorMessage: validationRes.array()[0].msg,
    });
  }

  //check user name and password
  const { userName, password } = req.body;
  const user: UserPasswordDoc | null = await UserPassword.findOne({
    userName: userName,
  });
  if (!user) {
    return res
      .status(422)
      .json({ errorMessage: "Invalid user name or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(422)
      .json({ errorMessage: "Invalid user name or password" });
  }

  //get user permissions
  const userPermissions: UserPermissionsObject | undefined =
    await permissionsFile.getPermissionUser(user._id.toString());

  //get session timeout from users.json file
  const jsonUser: UserObject | undefined = await usersFile.getUser(
    user._id.toString()
  );

  //set json web token as a signed cookie
  const token = jwt.sign(
    { _id: user._id, permissions: userPermissions?.permissions },
    process.env.JWT_SECRET!,
    { expiresIn: jsonUser ? `${jsonUser.sessionTimeout}m` : 3600 }
  );
  res
    .cookie("jwt", token, {
      signed: true,
      httpOnly: true,
      maxAge: jsonUser ? jsonUser.sessionTimeout * 60 * 1000 : 3600000,
    })
    .status(200)
    .json({ message: "Login success" });
};

//if user is logged in, redirect to home page
export const getHomePage: RequestHandler = async (req, res, next) => {
  const requestWithUserPermissions = req as RequestWithUserPermissions;
  if (requestWithUserPermissions.userPermissions) {
    //get user name
    const user = await usersFile.getUser(
      requestWithUserPermissions.userPermissions._id.toString()
    );

    return res.render("home", { pageTitle: `Welcome ${user?.firstName}` });
  }
  //else - go to login page
  return next();
};

export const postLogout: RequestHandler = (req, res, next) => {
  res.clearCookie("jwt").redirect("/");
};
