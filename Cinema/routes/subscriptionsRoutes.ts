import { Router } from "express";
import * as membersBLL from "../BLL/membersBLL";
import * as subscriptionsBLL from "../BLL/subscriptionsBLL";
import * as authMiddlewares from "../middlewares/authMiddlewares";
const router = Router();

//Endpoint localhost:3000/subscriptions

router.get(
  "/subscribe-form/:memberId",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth,
  subscriptionsBLL.getSubscribeForm
);

router.post(
  "/",
  authMiddlewares.jwtMiddleware,
  authMiddlewares.isAuth,
  subscriptionsBLL.postSubscription
);

export default router;
