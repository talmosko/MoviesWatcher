import { Types, ObjectId, PopulatedDoc } from "mongoose";
import {
  MemberDocument,
  SubscriptionDocument,
  SubscriptionObject,
} from "../interfaces/mongoose.gen";
import Member from "../models/membersModel";
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
    // Check if movie exists for this member
    let subscription: SubscriptionObject | null = await Subscription.findOne({
      memberId: memberId,
      "movies.movieId": movieId,
    });
    if (subscription) {
      throw new Error("Subscription to that movie already exists");
    }
    let updatedSubscription = await Subscription.findOneAndUpdate(
      { memberId: memberId },
      { $addToSet: { movies: { movieId: movieId, date: date } } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    if (!updatedSubscription) {
      throw new Error("Subscription not found");
    }

    return {
      subscription: updatedSubscription,
    };
  } catch (err: any) {
    console.log(err);
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
