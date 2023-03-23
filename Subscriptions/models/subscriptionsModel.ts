import mongoose from "mongoose";
import {
  SubscriptionSchema,
  SubscriptionModel,
  SubscriptionDocument,
} from "../interfaces/mongoose.gen";

const subscriptionsSchema: SubscriptionSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    unique: true,
  },
  movies: [
    {
      movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
      date: Date,
    },
  ],
});

const Subscription = mongoose.model<SubscriptionDocument, SubscriptionModel>(
  "Subscription",
  subscriptionsSchema
);

export default Subscription;
