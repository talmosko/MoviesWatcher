import { Router } from "express";
import * as membersBLL from "../BLL/membersBLL";
import * as authMiddlewares from "../middlewares/authMiddlewares";
import { UserPermissions } from "../types/objectTypes";
const router = Router();
//Endpoint localhost:3000/members

// Navigation

router.get(
  "/",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.ViewSubscriptions),
  membersBLL.getAllMembers
);

router.get(
  "/:memberId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.ViewSubscriptions),
  membersBLL.getMemberById
);

router.post(
  "/",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.CreateSubscriptions),
  membersBLL.addMember
);

router.put(
  "/:memberId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.UpdateSubscriptions),
  membersBLL.updateMember
);

router.delete(
  "/:memberId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.DeleteSubscriptions),
  membersBLL.deleteMember
);

export default router;
