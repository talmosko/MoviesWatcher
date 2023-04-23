import { RequestHandler } from "express";
import * as membersDAL from "../DAL/membersWS";

import { MemberObject } from "../types/objectTypes";

const getAllMembers: RequestHandler = async (req, res, next) => {
  try {
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
    const memberId = req.params.memberId;
    const deleteRes: {
      memberId: MemberObject["_id"];
    } = await membersDAL.deleteMember(memberId);
    res.status(200).json(deleteRes);
  } catch (err: any) {
    const error = new Error(err);
    next(error);
  }
};

export { getAllMembers, getMemberById, addMember, updateMember, deleteMember };
