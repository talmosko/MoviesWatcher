import { RequestHandler } from "express";
import * as membersDAL from "../DAL/membersWS";
import { MemberObject } from "../interfaces/subscriptionsTypes";

/* CRUD - Create, Read, Update, Delete Operations */
const getAllMembers: RequestHandler = async (req, res, next) => {
  try {
    let allMembers = await membersDAL.getMembers();
    res.render("subscriptions/all-members", {
      pageTitle: "All Members",
      members: allMembers,
      path: "/subscriptions",
      editing: false,
    });
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

const getMemberById: RequestHandler = async (req, res, next) => {
  try {
    let memberId = req.params.memberId;
    let member = await membersDAL.getMemberById(memberId);
    res.json(member);
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

const addMember: RequestHandler = async (req, res, next) => {
  try {
    let member = req.body as MemberObject;
    await membersDAL.addMember(member);
    res.redirect("/subscriptions");
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

const updateMember: RequestHandler = async (req, res, next) => {
  try {
    let memberId = req.params.memberId;
    let member = req.body;
    console.log(member);
    console.log(memberId);
    let updatedMember = await membersDAL.updateMember(memberId, member);
    res.status(201).json(updatedMember);
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

const deleteMember: RequestHandler = async (req, res, next) => {
  try {
    let memberId = req.params.memberId;
    await membersDAL.deleteMember(memberId);
    res.redirect(200, "/members");
  } catch (err: any) {
    let error = new Error(err);
    next(error);
  }
};

/* Navigation */

//Add Member Page
const getAddMemberPage: RequestHandler = (req, res, next) => {
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
    const memberId = req.params.memberId;
    const member = await membersDAL.getMemberById(memberId);
    res.render("subscriptions/add-member", {
      pageTitle: `Edit ${member.name}`,
      member: member,
      path: "/subscriptions/edit-member",
      editing: true,
    });
  } catch (err: any) {
    let error = new Error(err);
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
