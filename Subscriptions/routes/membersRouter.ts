import { Router } from "express";
import * as membersBLL from "../BLL/membersBLL";
import { MemberObject } from "../interfaces/mongoose.gen";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const members = await membersBLL.getAllMembers();
    res.status(200).json(members);
  } catch (err) {
    return next(err);
  }
});

router.get("/:memberId", async (req, res, next) => {
  try {
    const memberId = req.params.memberId;
    const member = await membersBLL.getMemberById(memberId);
    res.status(200).json(member);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const member = req.body as MemberObject;
    await membersBLL.addMember(member);
    res.status(201).json({ message: "Member added" });
  } catch (err) {
    return next(err);
  }
});

router.put("/:memberId", async (req, res, next) => {
  try {
    const memberId = req.params.memberId;
    const member = req.body as MemberObject;
    await membersBLL.updateMember(memberId, member);
    res.status(201).json({ message: "Member Updated" });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:memberId", async (req, res, next) => {
  try {
    const memberId = req.params.memberId;
    await membersBLL.deleteMember(memberId);
    res.status(200).json({ message: "Member deleted" });
  } catch (err) {
    return next(err);
  }
});

export default router;
