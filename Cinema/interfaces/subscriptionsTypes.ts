//Types of the Subscriptions WS
import { ObjectId } from "mongoose";

export type memberObject = {
  _id: ObjectId;
  externalId?: number;
  name?: string;
  email?: string;
  city?: string;
};

export type movieObject = {
  _id: ObjectId;
  externalId?: number;
  name?: string;
  genres: string[];
  image?: string;
  premiered?: Date;
};
