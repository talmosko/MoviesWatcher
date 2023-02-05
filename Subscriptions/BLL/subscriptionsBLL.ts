import { Types, ObjectId } from "mongoose";
import { SubscriptionObject } from "../interfaces/mongoose.gen";
import Movie from "../models/movieModel";
import Subscription from "../models/subscriptionsModel";

const initSubscriptionsDB = async () => {
  await Subscription.deleteMany({});
};

const postSubscription = async (
  movieId: ObjectId,
  memberId: ObjectId,
  date: Date
) => {
  try {
    let subscriptionId: Types.ObjectId;
    let foundSub = await Subscription.findOne({ memberId: memberId });
    if (foundSub) {
      //if there is a subscription for this member
      foundSub.movies.push({ movieId: movieId, date: date });
      foundSub.save();
      subscriptionId = foundSub._id;
    } else {
      //if there is no subscription, create new subscription
      let sub = new Subscription({
        movies: [{ movieId: movieId, date: date }],
        memberId: memberId,
      });
      await sub.save();
      subscriptionId = sub._id;
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

const getAllSubscriptions = async (): Promise<SubscriptionObject[]> => {
  try {
    return await Subscription.find({})
      .populate({
        path: "memberId",
        select: "_id name",
      })
      .populate({
        path: "movies.movieId",
        select: "_id name",
      });
  } catch (err: any) {
    throw new Error(err);
  }
};

const getSubscriptionsForMember = async (
  memberId: ObjectId
): Promise<SubscriptionObject[]> => {
  try {
    return await Subscription.find({ memberId: memberId })
      .populate({
        path: "memberId",
        select: "_id name",
      })
      .populate({
        path: "movies.movieId",
        select: "_id name",
      });
  } catch (err: any) {
    throw new Error(err);
  }
};

export {
  initSubscriptionsDB,
  postSubscription,
  getAllSubscriptions,
  getSubscriptionsForMember,
};
