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
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUser = exports.deleteUser = exports.postUser = exports.getUsers = exports.getUser = exports.getEditUserPage = exports.getAddUserPage = void 0;
const subscriptionsTypes_1 = require("../types/subscriptionsTypes");
const usersFile = __importStar(require("../DAL/usersFile"));
const permissionsFile = __importStar(require("../DAL/permissionsFile"));
const subscriptionsTypes_2 = require("../types/subscriptionsTypes");
const userPasswordModel_1 = require("../models/userPasswordModel");
/*Pages */
const getAddUserPage = async (req, res, next) => {
    try {
        //check 'Site Admin' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_2.UserPermissions.SiteAdmin)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        res.render("users/add-user", {
            pageTitle: "Add User",
            user: {},
            path: "users/add-user",
            editing: false,
            permissionsTypes: subscriptionsTypes_1.PermissionsTypes.map((permission) => {
                return { permission: permission, checked: false };
            }),
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getAddUserPage = getAddUserPage;
const getEditUserPage = async (req, res, next) => {
    try {
        //check 'Site Admin' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_2.UserPermissions.SiteAdmin)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { userId } = req.params;
        const user = await usersFile.getUser(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const permissionsForUser = await permissionsFile.getPermissionUser(userId);
        //get userName from users db
        const userName = await userPasswordModel_1.UserPassword.findById(userId, {
            userName: 1,
            _id: 1,
        });
        //checking user permissions and build permission array, with 'checked' property
        const editPermissions = subscriptionsTypes_1.PermissionsTypes.map((permission) => {
            return {
                permission: permission,
                checked: permissionsForUser &&
                    permissionsForUser.permissions &&
                    permissionsForUser.permissions.includes(permission),
            };
        });
        res.render("users/add-user", {
            pageTitle: "Edit User",
            user: Object.assign(Object.assign({}, user), { userName: userName === null || userName === void 0 ? void 0 : userName.userName }),
            path: "users/add-user",
            editing: true,
            permissionsTypes: editPermissions,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getEditUserPage = getEditUserPage;
/* CRUD */
const getUser = async (req, res, next) => {
    try {
        //check 'Site Admin' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_2.UserPermissions.SiteAdmin)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const allUsers = await usersFile.getUsers();
        const { userId } = req.params;
        const user = allUsers.find((user) => user._id.toString() === userId);
        res.json(user);
    }
    catch (err) {
        next(err);
    }
};
exports.getUser = getUser;
const getUsers = async (req, res, next) => {
    try {
        //check 'Site Admin' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_2.UserPermissions.SiteAdmin)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        //get all users from users.json
        const allJsonUsers = await usersFile.getUsers();
        //get all permissions from permissions.json
        const allPermissions = await permissionsFile.getPermissionUsers();
        //get all userNames from users db
        const allUserNames = await userPasswordModel_1.UserPassword.find({}, { userName: 1, _id: 1 });
        //add permissions and UserNames to users
        const allUsers = allJsonUsers.map((user) => {
            const permissions = allPermissions.find((permission) => permission._id.toString() === user._id.toString());
            const userName = allUserNames.find((userName) => userName._id.toString() === user._id.toString());
            return Object.assign(Object.assign({}, user), { fullName: `${user.firstName} ${user.lastName}`, permissions: permissions === null || permissions === void 0 ? void 0 : permissions.permissions, userName: userName === null || userName === void 0 ? void 0 : userName.userName });
        });
        res.status(200).render("users/all-users", {
            pageTitle: "All Users",
            users: allUsers,
            path: "/users",
            editing: false,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getUsers = getUsers;
const postUser = async (req, res, next) => {
    try {
        //check 'Site Admin' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_2.UserPermissions.SiteAdmin)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const inputUser = req.body;
        //save user to userPassword DB to get _id
        const userPassword = new userPasswordModel_1.UserPassword({ userName: inputUser.userName });
        await userPassword.save();
        if (userPassword && userPassword._id) {
            //add user to users.json
            const userToJson = {
                _id: userPassword._id,
                firstName: inputUser.firstName,
                lastName: inputUser.lastName,
                createdAt: new Date(),
                sessionTimeout: inputUser.sessionTimeout,
            };
            await usersFile.addUser(userToJson);
            //add user permissions to permissions.json
            const userToPermissions = {
                _id: userPassword._id,
                permissions: inputUser.permissions ? inputUser.permissions : [],
            };
            await permissionsFile.addPermissionUser(userToPermissions);
        }
        return res.redirect("/users");
    }
    catch (err) {
        next(err);
    }
};
exports.postUser = postUser;
const deleteUser = async (req, res, next) => {
    try {
        //check 'Site Admin' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_2.UserPermissions.SiteAdmin)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { userId } = req.params;
        //delete user from db
        await userPasswordModel_1.UserPassword.findByIdAndDelete(userId);
        //delete user from users.json
        await usersFile.deleteUser(userId);
        //delete user permissions from permissions.json
        await permissionsFile.deletePermissionUser(userId);
        console.log("User deleted");
        res.status(200).json({ message: "User deleted" });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteUser = deleteUser;
const putUser = async (req, res, next) => {
    try {
        //check 'Site Admin' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_2.UserPermissions.SiteAdmin)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const inputUser = req.body;
        //change userNmame in db
        await userPasswordModel_1.UserPassword.findByIdAndUpdate(inputUser._id, {
            userName: inputUser.userName,
        });
        //change user in users.json
        const userToJson = {
            _id: inputUser._id,
            firstName: inputUser.firstName,
            lastName: inputUser.lastName,
            sessionTimeout: inputUser.sessionTimeout,
        };
        await usersFile.updateUser(userToJson);
        //change user permissions to permissions.json
        const userToPermissions = {
            _id: inputUser._id,
            permissions: inputUser.permissions ? inputUser.permissions : [],
        };
        await permissionsFile.updatePermissionUser(userToPermissions);
        return res.status(201).json({ message: "User updated" });
    }
    catch (err) {
        next(err);
    }
};
exports.putUser = putUser;
