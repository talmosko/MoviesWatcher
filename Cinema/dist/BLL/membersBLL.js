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
const subscriptionsDAL = __importStar(require("../DAL/subscriptionsWS"));
const subscriptionsTypes_1 = require("../types/subscriptionsTypes");
/* Helper Functions */
//gets member (without subscriptions) and all subscriptions, returns member with subscriptions
const getSubscriptionsForMember = (member, allSubscriptions) => {
    let memberSubscriptions = allSubscriptions.filter((subscription) => {
        var _a;
        return ((_a = subscription.memberId) === null || _a === void 0 ? void 0 : _a._id) === member._id;
    });
    return Object.assign(Object.assign({}, member), { subscriptions: memberSubscriptions });
};
/* CRUD - Create, Read, Update, Delete Operations */
const getAllMembers = async (req, res, next) => {
    try {
        //check 'View Subscriptions' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_1.UserPermissions.ViewSubscriptions)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        //get all members
        let allMembers = await membersDAL.getMembers();
        //get all subscriptions
        let allSubscriptions = await subscriptionsDAL.getAllSubscriptions();
        //for each member, match the subscriptions
        allMembers = allMembers.map((member) => {
            return getSubscriptionsForMember(member, allSubscriptions);
        });
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
        //check 'View Subscriptions' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_1.UserPermissions.ViewSubscriptions)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let memberId = req.params.memberId;
        let member = await membersDAL.getMemberById(memberId);
        //get all subscriptions for member
        let allSubscriptions = await subscriptionsDAL.getSubscriptionsByMemberId(memberId);
        member = getSubscriptionsForMember(member, allSubscriptions);
        res.render("subscriptions/all-members", {
            pageTitle: "All Members",
            members: [member],
            path: "/subscriptions",
            editing: false,
        });
    }
    catch (err) {
        let error = new Error(err);
        next(error);
    }
};
exports.getMemberById = getMemberById;
const addMember = async (req, res, next) => {
    try {
        //check 'Create Subscriptions' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_1.UserPermissions.CreateSubscriptions)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
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
        //check 'Update Subscriptions' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_1.UserPermissions.UpdateSubscriptions)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let memberId = req.params.memberId;
        let member = req.body;
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
        //check 'Delete Subscriptions' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_1.UserPermissions.DeleteSubscriptions)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
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
    //check 'Add Subscriptions' permission
    const userPermissions = req.userPermissions
        .permissions;
    if (!userPermissions.includes(subscriptionsTypes_1.UserPermissions.CreateSubscriptions)) {
        return res.status(401).json({ message: "Unauthorized" });
    }
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
        //check 'Edit Subscriptions' permission
        const userPermissions = req.userPermissions
            .permissions;
        if (!userPermissions.includes(subscriptionsTypes_1.UserPermissions.UpdateSubscriptions)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
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
