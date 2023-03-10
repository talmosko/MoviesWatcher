//Types of the Subscriptions WS
import mongoose, { ObjectId } from "mongoose";
import { Request } from "express";

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
  name: string;
  genres: string[];
  image: string;
  premiered?: Date;
  subscriptions?: SubscriptionObject[];
};

export type SubscriptionObject = {
  _id?: ObjectId;
  memberId?: MemberObject;
  movies?: [{ movieId: MovieObject; date: Date }];
};

export const PermissionsTypes = [
  "View Subscriptions",
  "Create Subscriptions",
  "Update Subscriptions",
  "Delete Subscriptions",
  "View Movies",
  "Create Movies",
  "Update Movies",
  "Delete Movies",
  "Site Admin",
] as const;

export const UserPermissions = {
  ViewSubscriptions: PermissionsTypes[0],
  CreateSubscriptions: PermissionsTypes[1],
  UpdateSubscriptions: PermissionsTypes[2],
  DeleteSubscriptions: PermissionsTypes[3],
  ViewMovies: PermissionsTypes[4],
  CreateMovies: PermissionsTypes[5],
  UpdateMovies: PermissionsTypes[6],
  DeleteMovies: PermissionsTypes[7],
  SiteAdmin: PermissionsTypes[8],
} as const;

export interface UserObject {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  userName: string;
  createdAt?: Date;
  sessionTimeout: number;
  permissions?: typeof PermissionsTypes[number][];
  password?: string;
}

export interface UserPermissionsObject {
  _id: UserObject["_id"];
  permissions: typeof PermissionsTypes[number][];
}

export interface RequestWithUserPermissions extends Request {
  userPermissions?: UserPermissionsObject;
}
