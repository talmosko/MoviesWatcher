import { Router } from "express";
import * as membersBLL from "../BLL/membersBLL";

const router = Router();

//Endpoint localhost:3000/subscriptions

router.get("/", membersBLL.getAllMembers);

export default router;
