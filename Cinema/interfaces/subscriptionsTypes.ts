//Types of the Subscriptions WS
import { ObjectId } from "mongoose";

export type MemberObject = {
  _id: ObjectId;
  externalId?: number;
  name?: string;
  email?: string;
  city?: string;
  subscriptions?: SubscriptionObject[];
};

export type MovieObject = {
  _id: ObjectId;
  externalId?: number;
  name?: string;
  genres: string[];
  image?: string;
  premiered?: Date;
  subscriptions?: SubscriptionObject[];
};

export type SubscriptionObject = {
  _id?: ObjectId;
  memberId?: MemberObject;
  movies?: [{ movieId: MovieObject; date: Date }];
};
