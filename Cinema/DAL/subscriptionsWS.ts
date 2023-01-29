import axios from "axios";
import { SubscriptionObject } from "../types/subscriptionsTypes";
import dotenv from "dotenv";
import { ObjectId } from "mongoose";
dotenv.config();

const address =
  (process.env.SUBSCRIPTIONS_API_URL || "http://localhost:8000/") +
  "subscriptions";

const postSubscription = async (subscription: SubscriptionObject) => {
  try {
    const response = await axios.post(address, subscription);
    if (response.status !== 201) {
      throw new Error("Subscription not added");
    }
    const resData = await response.data;
    return resData;
  } catch (error: any) {
    throw new Error(error);
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
