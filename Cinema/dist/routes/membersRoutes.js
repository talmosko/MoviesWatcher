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
const express_1 = require("express");
const membersBLL = __importStar(require("../BLL/membersBLL"));
const authMiddlewares = __importStar(require("../middlewares/authMiddlewares"));
const router = (0, express_1.Router)();
//Endpoint localhost:3000/members
// Navigation
router.get("/add-member", authMiddlewares.jwtMiddleware, authMiddlewares.isAuth, membersBLL.getAddMemberPage);
router.get("/edit-member/:memberId", authMiddlewares.jwtMiddleware, authMiddlewares.isAuth, membersBLL.getEditMemberPage);
// CRUD - Create, Read, Update, Delete
router.get("/:memberId", authMiddlewares.jwtMiddleware, authMiddlewares.isAuth, membersBLL.getMemberById);
router.post("/", authMiddlewares.jwtMiddleware, authMiddlewares.isAuth, membersBLL.addMember);
router.put("/:memberId", authMiddlewares.jwtMiddleware, authMiddlewares.isAuth, membersBLL.updateMember);
router.delete("/:memberId", authMiddlewares.jwtMiddleware, authMiddlewares.isAuth, membersBLL.deleteMember);
exports.default = router;
