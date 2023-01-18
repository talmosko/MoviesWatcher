"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscriptionsByMemberId = exports.getAllSubscriptions = exports.postSubscription = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const address = (process.env.SUBSCRIPTIONS_API_URL || "http://localhost:8000/") +
    "subscriptions";
const postSubscription = async (subscription) => {
    try {
        const response = await axios_1.default.post(address, subscription);
        if (response.status !== 201) {
            throw new Error("Subscription not added");
        }
        const resData = await response.data;
        return resData;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.postSubscription = postSubscription;
const getSubscriptionsByMemberId = async (memberId) => {
    try {
        const response = await axios_1.default.get(address + "/member/" + memberId);
        if (response.status !== 200) {
            throw new Error("Error getting subscriptions");
        }
        const resData = (await response.data);
        return resData;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getSubscriptionsByMemberId = getSubscriptionsByMemberId;
const getAllSubscriptions = async () => {
    try {
        const response = await axios_1.default.get(address);
        if (response.status !== 200) {
            throw new Error("Error getting subscriptions");
        }
        const resData = (await response.data);
        return resData;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getAllSubscriptions = getAllSubscriptions;
