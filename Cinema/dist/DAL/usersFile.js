"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUser = exports.addUser = exports.setUsers = exports.getUsers = void 0;
const jsonfile_1 = __importDefault(require("jsonfile"));
const file = "./data/users.json";
// read from a json file
const getUsers = () => {
    try {
        return jsonfile_1.default.readFile(file);
    }
    catch (err) {
        return Promise.resolve([]);
    }
};
exports.getUsers = getUsers;
// write to a json file
const setUsers = async (userObject) => {
    try {
        await jsonfile_1.default.writeFile(file, userObject);
        return "Done";
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.setUsers = setUsers;
const addUser = async (userObject) => {
    try {
        const allUsers = await (0, exports.getUsers)();
        allUsers.push(userObject);
        await (0, exports.setUsers)(allUsers);
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.addUser = addUser;
const getUser = async (userId) => {
    try {
        const allUsers = await (0, exports.getUsers)();
        const user = allUsers.find((user) => user._id.toString() === userId);
        return user;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.getUser = getUser;
const deleteUser = async (userId) => {
    try {
        const allUsers = await (0, exports.getUsers)();
        const newUsers = allUsers.filter((user) => user._id.toString() !== userId);
        await (0, exports.setUsers)(newUsers);
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (userObject) => {
    try {
        const allUsers = await (0, exports.getUsers)();
        const userIndex = allUsers.findIndex((user) => user._id.toString() === userObject._id.toString());
        if (userIndex === -1)
            throw new Error("User not found");
        allUsers[userIndex] = Object.assign(Object.assign({}, userObject), { createdAt: allUsers[userIndex].createdAt });
        await (0, exports.setUsers)(allUsers);
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.updateUser = updateUser;
