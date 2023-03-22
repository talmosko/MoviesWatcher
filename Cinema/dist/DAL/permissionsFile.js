"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePermissionUser = exports.deletePermissionUser = exports.getPermissionUser = exports.addPermissionUser = exports.setPermissionUsers = exports.getPermissionUsers = void 0;
const jsonfile_1 = __importDefault(require("jsonfile"));
const file = "./data/permissions.json";
// read from a json file
const getPermissionUsers = () => {
    try {
        return jsonfile_1.default.readFile(file);
    }
    catch (err) {
        return Promise.resolve([]);
    }
};
exports.getPermissionUsers = getPermissionUsers;
// write to a json file
const setPermissionUsers = async (userPermissions) => {
    try {
        await jsonfile_1.default.writeFile(file, userPermissions);
        return "Done";
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.setPermissionUsers = setPermissionUsers;
const addPermissionUser = async (userPermissionsObject) => {
    try {
        const allPermissionsUsers = await (0, exports.getPermissionUsers)();
        allPermissionsUsers.push(userPermissionsObject);
        await (0, exports.setPermissionUsers)(allPermissionsUsers);
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.addPermissionUser = addPermissionUser;
const getPermissionUser = async (userId) => {
    try {
        const allPermissionsUsers = await (0, exports.getPermissionUsers)();
        const user = allPermissionsUsers.find((user) => user._id.toString() === userId);
        return user;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.getPermissionUser = getPermissionUser;
const deletePermissionUser = async (userId) => {
    try {
        const allPermissionUsers = await (0, exports.getPermissionUsers)();
        const newUsers = allPermissionUsers.filter((user) => user._id.toString() !== userId);
        await (0, exports.setPermissionUsers)(newUsers);
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.deletePermissionUser = deletePermissionUser;
const updatePermissionUser = async (permissionUser) => {
    try {
        const allUsers = await (0, exports.getPermissionUsers)();
        const userIndex = allUsers.findIndex((user) => user._id.toString() === permissionUser._id.toString());
        if (userIndex === -1)
            throw new Error("User not found");
        allUsers[userIndex] = permissionUser;
        await (0, exports.setPermissionUsers)(allUsers);
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.updatePermissionUser = updatePermissionUser;
