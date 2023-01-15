import { Router } from "express";
import * as membersBLL from "../BLL/membersBLL";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const members = await membersBLL.getAllMembers();
    res.json(members);
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const member = await membersBLL.getMemberById(id);
    res.json(member);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const member = req.body;
    await membersBLL.addMember(member);
    res.json(member);
  } catch (err) {
    return next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const member = req.body;
    await membersBLL.updateMember(id, member);
    res.json(member);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await membersBLL.deleteMember(id);
    res.json({ message: "Member deleted" });
  } catch (err) {
    return next(err);
  }
});

export default router;
