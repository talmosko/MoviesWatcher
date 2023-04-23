import { Router } from "express";
import * as membersBLL from "../BLL/membersBLL";
import * as subscriptionsBLL from "../BLL/subscriptionsBLL";
import * as authMiddlewares from "../middlewares/authMiddlewares";
import { UserPermissions } from "../types/objectTypes";
const router = Router();

//Endpoint localhost:3000/subscriptions

router.get(
  "/",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.ViewSubscriptions),
  subscriptionsBLL.getAllSubscriptions
);

router.post(
  "/",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth(UserPermissions.CreateSubscriptions),
  subscriptionsBLL.postSubscription
);

export default router;
