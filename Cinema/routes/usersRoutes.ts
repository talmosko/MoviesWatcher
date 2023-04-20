import { Router } from "express";
import * as usersBLL from "../BLL/usersBLL";
import * as authMiddlewares from "../middlewares/authMiddlewares";
import { UserPermissions } from "../types/objectTypes";
const router = Router();

router.get(
  "/",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.SiteAdmin),
  usersBLL.getUsers
);
router.get(
  "/:userId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.SiteAdmin),
  usersBLL.getUser
);
router.post(
  "/",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.SiteAdmin),
  usersBLL.postUser
);
router.delete(
  "/:userId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.SiteAdmin),
  usersBLL.deleteUser
);
router.put(
  "/:userId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.SiteAdmin),
  usersBLL.putUser
);

export default router;
