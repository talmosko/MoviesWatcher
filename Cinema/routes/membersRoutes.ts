import { Router } from "express";
import * as membersBLL from "../BLL/membersBLL";

const router = Router();

//Endpoint localhost:3000/members

// Navigation

router.get("/add-member", membersBLL.getAddMemberPage);
router.get("/edit-member/:memberId", membersBLL.getEditMemberPage);

// CRUD - Create, Read, Update, Delete
router.get("/:memberId", membersBLL.getMemberById);

router.post("/", membersBLL.addMember);

router.put("/:memberId", membersBLL.updateMember);

router.delete("/:memberId", membersBLL.deleteMember);

export default router;
