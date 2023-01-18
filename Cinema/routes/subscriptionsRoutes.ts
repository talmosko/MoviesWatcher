import { Router } from "express";
import * as membersBLL from "../BLL/membersBLL";
import * as subscriptionsBLL from "../BLL/subscriptionsBLL";

const router = Router();

//Endpoint localhost:3000/subscriptions

router.get("/", membersBLL.getAllMembers);

router.get("/subscribe-form/:memberId", subscriptionsBLL.getSubscribeForm);

router.post("/", subscriptionsBLL.postSubscription);

export default router;
