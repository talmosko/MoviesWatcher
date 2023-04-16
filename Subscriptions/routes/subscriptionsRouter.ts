import { Router } from "express";
import { ObjectId, Types } from "mongoose";
import {
  postSubscription,
  getSubscriptionsForMember,
  getAllSubscriptions,
} from "../BLL/subscriptionsBLL";
import { SubscriptionObject } from "../interfaces/mongoose.gen";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const movieId = req.body.movieId as ObjectId;
    const memberId = req.body.memberId as ObjectId;
    const date = req.body.date as Date;
    const postResponse: {
      subscription: SubscriptionObject;
    } = await postSubscription(movieId, memberId, date);
    res.status(201).json({ message: "ok", ...postResponse });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

router.get("/member/:memberId", async (req, res, next) => {
  try {
    const memberId = new Types.ObjectId(
      req.params.memberId
    ) as unknown as ObjectId;
    const memberSubscriptions = await getSubscriptionsForMember(memberId);
    res.json(memberSubscriptions);
  } catch (err) {
    return next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const subscriptions = await getAllSubscriptions();
    res.json(subscriptions);
  } catch (err) {
    return next(err);
  }
});

export default router;
