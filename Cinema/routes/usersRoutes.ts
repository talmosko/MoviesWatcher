import { Router } from "express";
import * as usersBLL from "../BLL/usersBLL";
import * as authMiddlewares from "../middlewares/authMiddlewares";
const router = Router();

/* Pages */
router.get(
  "/add-user",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth,
  usersBLL.getAddUserPage
);
router.get(
  "/edit-user/:userId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth,
  usersBLL.getEditUserPage
);

/* CRUD */

router.get(
  "/",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth,
  usersBLL.getUsers
);
router.get(
  "/:userId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth,
  usersBLL.getUser
);
router.post(
  "/",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth,
  usersBLL.postUser
);
router.delete(
  "/:userId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth,
  usersBLL.deleteUser
);
router.put(
  "/:userId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth,
  usersBLL.putUser
);

export default router;
