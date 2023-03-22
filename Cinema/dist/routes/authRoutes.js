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
const express_validator_1 = require("express-validator");
const authBLL = __importStar(require("../BLL/authBLL"));
const authMiddlewares = __importStar(require("../middlewares/authMiddlewares"));
const router = (0, express_1.Router)();
//Endpoint localhost:3000/auth
/*gets the jwt token from cookies and verifies it
if is loggend in - get the home page, if not, get the login page*/
router.get("/", authMiddlewares.jwtMiddleware, authBLL.getHomePage, authBLL.getLoginPage);
router.get("/signup", authBLL.getSignupPage);
exports.default = router;
//
router.post("/signup", [
    (0, express_validator_1.body)("userName")
        .isEmail()
        .withMessage("Please enter a valid email address.")
        .normalizeEmail(),
    (0, express_validator_1.body)("password")
        .trim()
        .isStrongPassword()
        .withMessage("Password not strong enough."),
], authBLL.postSignup);
router.post("/login", [
    (0, express_validator_1.body)("userName")
        .isEmail()
        .withMessage("Please enter a valid email address.")
        .trim(),
], authBLL.postLogin);
router.post("/logout", authBLL.postLogout);
