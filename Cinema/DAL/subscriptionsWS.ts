import axios from "axios";
import {
  SubscriptionObject,
  SubscriptionRequestObject,
} from "../types/objectTypes";
import dotenv from "dotenv";
import { ObjectId } from "mongoose";
dotenv.config();

const address =
  (process.env.SUBSCRIPTIONS_API_URL || "http://localhost:8000/") +
  "subscriptions";

const postSubscription = async (
  subscriptionReq: SubscriptionRequestObject
): Promise<SubscriptionObject> => {
  try {
    const response = await axios.post(address, subscriptionReq);
    if (response.status !== 201) {
      console.log("ERROR: " + response.data);
      throw new Error("Subscription not added");
    }
    console.log(response.data);
    const subscription = (await response.data) as SubscriptionObject;
    return subscription;
  } catch (error: any) {
    throw new Error("Subscription not added");
  }
};

const getSubscriptionsByMemberId = async (memberId: string) => {
  try {
    const response = await axios.get(address + "/member/" + memberId);
    if (response.status !== 200) {
      throw new Error("Error getting subscriptions");
    }
    const resData = (await response.data) as SubscriptionObject[];
    return resData;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getAllSubscriptions = async (): Promise<SubscriptionObject[]> => {
  try {
    const response = await axios.get(address);
    if (response.status !== 200) {
      throw new Error("Error getting subscriptions");
    }
    const resData = (await response.data) as SubscriptionObject[];
    return resData;
  } catch (error: any) {
    return [];
  }
};

export { postSubscription, getAllSubscriptions, getSubscriptionsByMemberId };
