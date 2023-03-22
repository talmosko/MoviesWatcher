"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogout = exports.getHomePage = exports.postLogin = exports.postSignup = exports.getSignupPage = exports.getLoginPage = void 0;
const express_validator_1 = require("express-validator");
const userPasswordModel_1 = require("../models/userPasswordModel");
const permissionsFile = __importStar(require("../DAL/permissionsFile"));
const usersFile = __importStar(require("../DAL/usersFile"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getLoginPage = (req, res, next) => {
    res.render("auth/login", {
        pageTitle: "Login",
        path: "auth/login",
        login: true,
    });
};
exports.getLoginPage = getLoginPage;
const getSignupPage = (req, res, next) => {
    res.render("auth/login", {
        pageTitle: "Create An Account",
        path: "auth/login",
        login: false,
    });
};
exports.getSignupPage = getSignupPage;
const postSignup = async (req, res, next) => {
    try {
        // if there are validation errors
        const validationRes = (0, express_validator_1.validationResult)(req);
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
        const user = await userPasswordModel_1.UserPassword.findOne({
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
        const hashedPassword = await bcryptjs_1.default.hash(password, +process.env.BCRYPT_SALT);
        user.password = hashedPassword;
        await user.save();
        return res.status(201).json({ message: "User created!" });
    }
    catch (error) {
        return next(error);
    }
};
exports.postSignup = postSignup;
const postLogin = async (req, res, next) => {
    //check validation errors
    const validationRes = (0, express_validator_1.validationResult)(req);
    if (!validationRes.isEmpty()) {
        return res.status(422).json({
            errorMessage: validationRes.array()[0].msg,
        });
    }
    //check user name and password
    const { userName, password } = req.body;
    const user = await userPasswordModel_1.UserPassword.findOne({
        userName: userName,
    });
    if (!user) {
        return res
            .status(422)
            .json({ errorMessage: "Invalid user name or password" });
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return res
            .status(422)
            .json({ errorMessage: "Invalid user name or password" });
    }
    //get user permissions
    const userPermissions = await permissionsFile.getPermissionUser(user._id.toString());
    //get session timeout from users.json file
    const jsonUser = await usersFile.getUser(user._id.toString());
    //set json web token as a signed cookie
    const token = jsonwebtoken_1.default.sign({ _id: user._id, permissions: userPermissions === null || userPermissions === void 0 ? void 0 : userPermissions.permissions }, process.env.JWT_SECRET, { expiresIn: jsonUser ? `${jsonUser.sessionTimeout}m` : 3600 });
    res
        .cookie("jwt", token, {
        signed: true,
        httpOnly: true,
        maxAge: jsonUser ? jsonUser.sessionTimeout * 60 * 1000 : 3600000,
    })
        .status(200)
        .json({ message: "Login success" });
};
exports.postLogin = postLogin;
//if user is logged in, redirect to home page
const getHomePage = async (req, res, next) => {
    const requestWithUserPermissions = req;
    if (requestWithUserPermissions.userPermissions) {
        //get user name
        const user = await usersFile.getUser(requestWithUserPermissions.userPermissions._id.toString());
        return res.render("home", { pageTitle: `Welcome ${user === null || user === void 0 ? void 0 : user.firstName}` });
    }
    //else - go to login page
    return next();
};
exports.getHomePage = getHomePage;
const postLogout = (req, res, next) => {
    res.clearCookie("jwt").redirect("/");
};
exports.postLogout = postLogout;
