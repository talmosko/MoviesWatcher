"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const memberSchema = new mongoose_1.default.Schema({
    externalId: Number,
    name: String,
    email: String,
    city: String
});
const Member = mongoose_1.default.model("members", memberSchema);
exports.default = Member;
