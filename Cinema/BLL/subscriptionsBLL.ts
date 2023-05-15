import { RequestHandler } from "express";
import {
  SubscriptionObject,
  SubscriptionRequestObject,
} from "../types/objectTypes";
import * as subscriptionWS from "../DAL/subscriptionsWS";

const postSubscription: RequestHandler = async (req, res, next) => {
  try {
    const subscription: SubscriptionRequestObject =
      req.body as SubscriptionRequestObject;
    const newSubscription: SubscriptionObject =
      await subscriptionWS.postSubscription(subscription);
    res.status(201).json({ message: "ok", subscription: newSubscription });
  } catch (err: any) {
    next(err);
  }
};

const getAllSubscriptions: RequestHandler = async (req, res, next) => {
  try {
    const allSubs: SubscriptionObject[] =
      await subscriptionWS.getAllSubscriptions();
    res.status(201).json({ message: "ok", subscriptions: allSubs });
  } catch (err: any) {
    next(err);
  }
};

export { postSubscription, getAllSubscriptions };
