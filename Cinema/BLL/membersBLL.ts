import { RequestHandler } from "express";
import * as membersDAL from "../DAL/membersWS";
import { hasPermission } from "../middlewares/authMiddlewares";

import {
  MemberObject,
  UserPermissions,
  RequestWithUserPermissions,
  SubscriptionObject,
} from "../types/objectTypes";

/* Helper Functions */

/* CRUD - Create, Read, Update, Delete Operations */
const getAllMembers: RequestHandler = async (req, res, next) => {
  try {
    //check 'View Subscriptions' permission
    // const hasViewSubscriptions = hasPermission(req, UserPermissions.ViewSubscriptions);
    // if (!hasViewSubscriptions) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    //get all members

    const allMembers = await membersDAL.getMembers();

    res.json({
      members: allMembers,
    });
  } catch (err: any) {
    const error = new Error(err);
    next(error);
  }
};

const getMemberById: RequestHandler = async (req, res, next) => {
  try {
    //check 'View Subscriptions' permission
    // const hasViewSubscriptions = hasPermission(req, UserPermissions.ViewSubscriptions);
    // if (!hasViewSubscriptions) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    const memberId = req.params.memberId;
    const member = await membersDAL.getMemberById(memberId);

    res.json({
      member,
    });
  } catch (err: any) {
    const error = new Error(err);
    next(error);
  }
};

const addMember: RequestHandler = async (req, res, next) => {
  try {
    //check 'Create Subscriptions' permission
    // const hasCreateSubscriptions = hasPermission(
    //   req,
    //   UserPermissions.CreateSubscriptions
    // );
    // if (!hasCreateSubscriptions) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    const member = req.body as MemberObject;
    await membersDAL.addMember(member);
    res.json({ message: "Member added successfully", member });
  } catch (err: any) {
    const error = new Error(err);
    next(error);
  }
};

const updateMember: RequestHandler = async (req, res, next) => {
  try {
    //check 'Update Subscriptions' permission
    // const hasUpdateSubscriptions = hasPermission(req, UserPermissions.UpdateSubscriptions);
    // if (!hasUpdateSubscriptions) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    const memberId = req.params.memberId;
    const member = req.body;
    const updatedMember = await membersDAL.updateMember(memberId, member);
    res
      .status(201)
      .json({ message: "Member updated successfully", member: updatedMember });
  } catch (err: any) {
    const error = new Error(err);
    next(error);
  }
};

const deleteMember: RequestHandler = async (req, res, next) => {
  try {
    //check 'Delete Subscriptions' permission
    // const hasDeleteSubscriptions = hasPermission(
    //   req,
    //   UserPermissions.DeleteSubscriptions
    // );
    // if (!hasDeleteSubscriptions) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    const memberId = req.params.memberId;
    const deleteRes: {
      memberId: MemberObject["_id"];
      subscriptions: SubscriptionObject["_id"][];
    } = await membersDAL.deleteMember(memberId);
    res.status(200).json(deleteRes);
  } catch (err: any) {
    const error = new Error(err);
    next(error);
  }
};

/* Navigation */

//Add Member Page
const getAddMemberPage: RequestHandler = (req, res, next) => {
  //check 'Add Subscriptions' permission
  const userPermissions = (req as RequestWithUserPermissions).userPermissions!
    .permissions;
  if (!userPermissions.includes(UserPermissions.CreateSubscriptions)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.render("subscriptions/add-member", {
    pageTitle: "Add Member",
    member: {},
    path: "/subscriptions/add-member",
    editing: false,
  });
};

//Edit Member Page

const getEditMemberPage: RequestHandler = async (req, res, next) => {
  try {
    //check 'Edit Subscriptions' permission
    const userPermissions = (req as RequestWithUserPermissions).userPermissions!
      .permissions;
    if (!userPermissions.includes(UserPermissions.UpdateSubscriptions)) {
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
  } catch (err: any) {
    const error = new Error(err);
    next(error);
  }
};

export {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
  getAddMemberPage,
  getEditMemberPage,
};
