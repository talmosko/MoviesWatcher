import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { UserPassword, UserPasswordDoc } from "../models/userPasswordModel";
import * as permissionsFile from "../DAL/permissionsFile";
import * as usersFile from "../DAL/usersFile";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  RequestWithUserPermissions,
  UserObject,
  UserPermissionsObject,
} from "../types/objectTypes";

export const postSignup: RequestHandler = async (req, res, next) => {
  try {
    // if there are validation errors
    const validationRes = validationResult(req);
    if (!validationRes.isEmpty()) {
      return res.status(422).json({
        message: validationRes.array()[0].msg,
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
      return res.status(422).json({ message: "Invalid user name or password" });
    }

    if (user.password && user.password.length > 0) {
      //already have password
      return res.status(422).json({ message: "User already have password" });
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
      message: validationRes.array()[0].msg,
    });
  }
  //check user name and password
  const { userName, password } = req.body;
  const user: UserPasswordDoc | null = await UserPassword.findOne({
    userName: userName,
  });
  if (!user) {
    return res.status(422).json({ message: "Invalid user name or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).json({ message: "Invalid user name or password" });
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
      sameSite: "strict",
      maxAge: jsonUser ? jsonUser.sessionTimeout * 60 * 1000 : 3600000,
    })
    .status(200)
    .json({
      userId: user._id,
      sessionTimeout: jsonUser ? jsonUser.sessionTimeout : 60,
      permissions: userPermissions?.permissions,
    });
};

export const postLogout: RequestHandler = (req, res, next) => {
  console.log("logout");
  res.clearCookie("jwt").status(200).json({ message: "Logout success" });
};
