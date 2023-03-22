"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.updateMember = exports.addMember = exports.getMemberById = exports.getMembers = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const address = (process.env.SUBSCRIPTIONS_API_URL || "http://localhost:8000/") + "members";
const getMembers = async () => {
    try {
        const response = await axios_1.default.get(address);
        if (response.status !== 200) {
            throw new Error("Members not found");
        }
        const members = (await response.data);
        return members;
    }
    catch (err) {
        return [];
    }
};
exports.getMembers = getMembers;
const getMemberById = async (memberId) => {
    try {
        const response = await axios_1.default.get(address + "/" + memberId);
        if (response.status !== 200) {
            throw new Error("Members not found");
        }
        const resData = (await response.data);
        return resData;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.getMemberById = getMemberById;
const addMember = async (member) => {
    try {
        const response = await axios_1.default.post(address, member);
        if (response.status !== 201) {
            throw new Error("Member not added");
        }
        const resData = await response.data;
        return resData;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.addMember = addMember;
const updateMember = async (memberId, member) => {
    try {
        const response = await axios_1.default.put(address + "/" + memberId, member);
        console.log(response.status);
        if (response.status !== 201) {
            throw new Error("Member not updated");
        }
        const resData = await response.data;
        return resData;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.updateMember = updateMember;
const deleteMember = async (memberId) => {
    const response = await axios_1.default.delete(address + "/" + memberId);
    if (response.status !== 200) {
        throw new Error("Member not deleted");
    }
    const resData = await response.data;
    return resData;
};
exports.deleteMember = deleteMember;
