import { Router } from "express";
import * as membersBLL from "../BLL/membersBLL";
import * as authMiddlewares from "../middlewares/authMiddlewares";
const router = Router();

//Endpoint localhost:3000/members

// Navigation

router.get(
  "/add-member",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth,
  membersBLL.getAddMemberPage
);
router.get(
  "/edit-member/:memberId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth,
  membersBLL.getEditMemberPage
);

// CRUD - Create, Read, Update, Delete

router.get(
  "/",
  // authMiddlewares.jwtMiddleware,
  // authMiddlewares.isAuth,
  membersBLL.getAllMembers
);

router.get(
  "/:memberId",
  // authMiddlewares.jwtMiddleware,
  // authMiddlewares.isAuth,
  membersBLL.getMemberById
);

router.post(
  "/",
  // authMiddlewares.jwtMiddleware,
  // authMiddlewares.isAuth,
  membersBLL.addMember
);

router.put(
  "/:memberId",
  // authMiddlewares.jwtMiddleware,
  // authMiddlewares.isAuth,
  membersBLL.updateMember
);

router.delete(
  "/:memberId",
  // authMiddlewares.jwtMiddleware,
  // authMiddlewares.isAuth,
  membersBLL.deleteMember
);

export default router;
