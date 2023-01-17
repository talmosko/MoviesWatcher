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
exports.getEditMemberPage = exports.getAddMemberPage = exports.deleteMember = exports.updateMember = exports.addMember = exports.getMemberById = exports.getAllMembers = void 0;
const membersDAL = __importStar(require("../DAL/membersWS"));
/* CRUD - Create, Read, Update, Delete Operations */
const getAllMembers = async (req, res, next) => {
    try {
        let allMembers = await membersDAL.getMembers();
        res.render("subscriptions/all-members", {
            pageTitle: "All Members",
            members: allMembers,
            path: "/subscriptions",
            editing: false,
        });
    }
    catch (err) {
        let error = new Error(err);
        next(error);
    }
};
exports.getAllMembers = getAllMembers;
const getMemberById = async (req, res, next) => {
    try {
        let memberId = req.params.memberId;
        let member = await membersDAL.getMemberById(memberId);
        res.json(member);
    }
    catch (err) {
        let error = new Error(err);
        next(error);
    }
};
exports.getMemberById = getMemberById;
const addMember = async (req, res, next) => {
    try {
        let member = req.body;
        await membersDAL.addMember(member);
        res.redirect("/subscriptions");
    }
    catch (err) {
        let error = new Error(err);
        next(error);
    }
};
exports.addMember = addMember;
const updateMember = async (req, res, next) => {
    try {
        let memberId = req.params.memberId;
        let member = req.body;
        console.log(member);
        console.log(memberId);
        let updatedMember = await membersDAL.updateMember(memberId, member);
        res.status(201).json(updatedMember);
    }
    catch (err) {
        let error = new Error(err);
        next(error);
    }
};
exports.updateMember = updateMember;
const deleteMember = async (req, res, next) => {
    try {
        let memberId = req.params.memberId;
        await membersDAL.deleteMember(memberId);
        res.redirect(200, "/members");
    }
    catch (err) {
        let error = new Error(err);
        next(error);
    }
};
exports.deleteMember = deleteMember;
/* Navigation */
//Add Member Page
const getAddMemberPage = (req, res, next) => {
    res.render("subscriptions/add-member", {
        pageTitle: "Add Member",
        member: {},
        path: "/subscriptions/add-member",
        editing: false,
    });
};
exports.getAddMemberPage = getAddMemberPage;
//Edit Member Page
const getEditMemberPage = async (req, res, next) => {
    try {
        const memberId = req.params.memberId;
        const member = await membersDAL.getMemberById(memberId);
        res.render("subscriptions/add-member", {
            pageTitle: `Edit ${member.name}`,
            member: member,
            path: "/subscriptions/edit-member",
            editing: true,
        });
    }
    catch (err) {
        let error = new Error(err);
        next(error);
    }
};
exports.getEditMemberPage = getEditMemberPage;
