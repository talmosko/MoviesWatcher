//Types of the Subscriptions WS
import { ObjectId } from "mongoose";

export type MemberObject = {
  _id: ObjectId;
  externalId?: number;
  name?: string;
  email?: string;
  city?: string;
};

export type MovieObject = {
  _id: ObjectId;
  externalId?: number;
  name?: string;
  genres: string[];
  image?: string;
  premiered?: Date;
};
