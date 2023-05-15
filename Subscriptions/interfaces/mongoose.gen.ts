/* tslint:disable */
/* eslint-disable */

// ######################################## THIS FILE WAS GENERATED BY MONGOOSE-TSGEN ######################################## //

// NOTE: ANY CHANGES MADE WILL BE OVERWRITTEN ON SUBSEQUENT EXECUTIONS OF MONGOOSE-TSGEN.

import mongoose from "mongoose";

/**
 * Lean version of MemberDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `MemberDocument.toObject()`. To avoid conflicts with model names, use the type alias `MemberObject`.
 * ```
 * const memberObject = member.toObject();
 * ```
 */
export type Member = {
  externalId?: number;
  name?: string;
  email?: string;
  city?: string;
  _id: mongoose.Types.ObjectId;
};

/**
 * Lean version of MemberDocument (type alias of `Member`)
 *
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { Member } from "../models"
 * import { MemberObject } from "../interfaces/mongoose.gen.ts"
 *
 * const memberObject: MemberObject = member.toObject();
 * ```
 */
export type MemberObject = Member;

/**
 * Mongoose Query type
 *
 * This type is returned from query functions. For most use cases, you should not need to use this type explicitly.
 */
export type MemberQuery = mongoose.Query<any, MemberDocument, MemberQueries> &
  MemberQueries;

/**
 * Mongoose Query helper types
 *
 * This type represents `MemberSchema.query`. For most use cases, you should not need to use this type explicitly.
 */
export type MemberQueries = {};

export type MemberMethods = {};

export type MemberStatics = {};

/**
 * Mongoose Model type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Member = mongoose.model<MemberDocument, MemberModel>("Member", MemberSchema);
 * ```
 */
export type MemberModel = mongoose.Model<MemberDocument, MemberQueries> &
  MemberStatics;

/**
 * Mongoose Schema type
 *
 * Assign this type to new Member schema instances:
 * ```
 * const MemberSchema: MemberSchema = new mongoose.Schema({ ... })
 * ```
 */
export type MemberSchema = mongoose.Schema<
  MemberDocument,
  MemberModel,
  MemberMethods,
  MemberQueries
>;

/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Member = mongoose.model<MemberDocument, MemberModel>("Member", MemberSchema);
 * ```
 */
export type MemberDocument = mongoose.Document<
  mongoose.Types.ObjectId,
  MemberQueries
> &
  MemberMethods & {
    externalId?: number;
    name?: string;
    email?: string;
    city?: string;
    _id: mongoose.Types.ObjectId;
  };

/**
 * Lean version of MovieDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `MovieDocument.toObject()`. To avoid conflicts with model names, use the type alias `MovieObject`.
 * ```
 * const movieObject = movie.toObject();
 * ```
 */
export type Movie = {
  externalId?: number;
  name?: string;
  genres: string[];
  image?: string;
  premiered?: Date;
  _id: mongoose.Types.ObjectId;
};

/**
 * Lean version of MovieDocument (type alias of `Movie`)
 *
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { Movie } from "../models"
 * import { MovieObject } from "../interfaces/mongoose.gen.ts"
 *
 * const movieObject: MovieObject = movie.toObject();
 * ```
 */
export type MovieObject = Movie;

/**
 * Mongoose Query type
 *
 * This type is returned from query functions. For most use cases, you should not need to use this type explicitly.
 */
export type MovieQuery = mongoose.Query<any, MovieDocument, MovieQueries> &
  MovieQueries;

/**
 * Mongoose Query helper types
 *
 * This type represents `MovieSchema.query`. For most use cases, you should not need to use this type explicitly.
 */
export type MovieQueries = {};

export type MovieMethods = {};

export type MovieStatics = {};

/**
 * Mongoose Model type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Movie = mongoose.model<MovieDocument, MovieModel>("Movie", MovieSchema);
 * ```
 */
export type MovieModel = mongoose.Model<MovieDocument, MovieQueries> &
  MovieStatics;

/**
 * Mongoose Schema type
 *
 * Assign this type to new Movie schema instances:
 * ```
 * const MovieSchema: MovieSchema = new mongoose.Schema({ ... })
 * ```
 */
export type MovieSchema = mongoose.Schema<
  MovieDocument,
  MovieModel,
  MovieMethods,
  MovieQueries
>;

/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Movie = mongoose.model<MovieDocument, MovieModel>("Movie", MovieSchema);
 * ```
 */
export type MovieDocument = mongoose.Document<
  mongoose.Types.ObjectId,
  MovieQueries
> &
  MovieMethods & {
    externalId?: number;
    name?: string;
    genres: mongoose.Types.Array<string>;
    image?: string;
    premiered?: Date;
    _id: mongoose.Types.ObjectId;
  };

/**
 * Lean version of SubscriptionMovieDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `SubscriptionDocument.toObject()`.
 * ```
 * const subscriptionObject = subscription.toObject();
 * ```
 */
export type SubscriptionMovie = {
  movieId?: Movie["_id"] | Movie;
  date?: Date;
  _id: mongoose.Types.ObjectId;
};

/**
 * Lean version of SubscriptionDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `SubscriptionDocument.toObject()`. To avoid conflicts with model names, use the type alias `SubscriptionObject`.
 * ```
 * const subscriptionObject = subscription.toObject();
 * ```
 */
export type Subscription = {
  memberId?: Member["_id"] | Member;
  movies: SubscriptionMovie[];
  _id: mongoose.Types.ObjectId;
};

/**
 * Lean version of SubscriptionDocument (type alias of `Subscription`)
 *
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { Subscription } from "../models"
 * import { SubscriptionObject } from "../interfaces/mongoose.gen.ts"
 *
 * const subscriptionObject: SubscriptionObject = subscription.toObject();
 * ```
 */
export type SubscriptionObject = Subscription;

/**
 * Mongoose Query type
 *
 * This type is returned from query functions. For most use cases, you should not need to use this type explicitly.
 */
export type SubscriptionQuery = mongoose.Query<
  any,
  SubscriptionDocument,
  SubscriptionQueries
> &
  SubscriptionQueries;

/**
 * Mongoose Query helper types
 *
 * This type represents `SubscriptionSchema.query`. For most use cases, you should not need to use this type explicitly.
 */
export type SubscriptionQueries = {};

export type SubscriptionMethods = {};

export type SubscriptionStatics = {};

/**
 * Mongoose Model type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Subscription = mongoose.model<SubscriptionDocument, SubscriptionModel>("Subscription", SubscriptionSchema);
 * ```
 */
export type SubscriptionModel = mongoose.Model<
  SubscriptionDocument,
  SubscriptionQueries
> &
  SubscriptionStatics;

/**
 * Mongoose Schema type
 *
 * Assign this type to new Subscription schema instances:
 * ```
 * const SubscriptionSchema: SubscriptionSchema = new mongoose.Schema({ ... })
 * ```
 */
export type SubscriptionSchema = mongoose.Schema<
  SubscriptionDocument,
  SubscriptionModel,
  SubscriptionMethods,
  SubscriptionQueries
>;

/**
 * Mongoose Subdocument type
 *
 * Type of `SubscriptionDocument["movies"]` element.
 */
export type SubscriptionMovieDocument = mongoose.Types.Subdocument & {
  movieId?: MovieDocument["_id"] | MovieDocument;
  date?: Date;
  _id: mongoose.Types.ObjectId;
};

/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Subscription = mongoose.model<SubscriptionDocument, SubscriptionModel>("Subscription", SubscriptionSchema);
 * ```
 */
export type SubscriptionDocument = mongoose.Document<
  mongoose.Types.ObjectId,
  SubscriptionQueries
> &
  SubscriptionMethods & {
    memberId?: MemberDocument["_id"] | MemberDocument;
    movies: mongoose.Types.DocumentArray<SubscriptionMovieDocument>;
    _id: mongoose.Types.ObjectId;
  };

/**
 * Check if a property on a document is populated:
 * ```
 * import { IsPopulated } from "../interfaces/mongoose.gen.ts"
 *
 * if (IsPopulated<UserDocument["bestFriend"]>) { ... }
 * ```
 */
export function IsPopulated<T>(doc: T | mongoose.Types.ObjectId): doc is T {
  return doc instanceof mongoose.Document;
}

/**
 * Helper type used by `PopulatedDocument`. Returns the parent property of a string
 * representing a nested property (i.e. `friend.user` -> `friend`)
 */
type ParentProperty<T> = T extends `${infer P}.${string}` ? P : never;

/**
 * Helper type used by `PopulatedDocument`. Returns the child property of a string
 * representing a nested property (i.e. `friend.user` -> `user`).
 */
type ChildProperty<T> = T extends `${string}.${infer C}` ? C : never;

/**
 * Helper type used by `PopulatedDocument`. Removes the `ObjectId` from the general union type generated
 * for ref documents (i.e. `mongoose.Types.ObjectId | UserDocument` -> `UserDocument`)
 */
type PopulatedProperty<Root, T extends keyof Root> = Omit<Root, T> & {
  [ref in T]: Root[T] extends mongoose.Types.Array<infer U>
    ? mongoose.Types.Array<Exclude<U, mongoose.Types.ObjectId>>
    : Exclude<Root[T], mongoose.Types.ObjectId>;
};

/**
 * Populate properties on a document type:
 * ```
 * import { PopulatedDocument } from "../interfaces/mongoose.gen.ts"
 *
 * function example(user: PopulatedDocument<UserDocument, "bestFriend">) {
 *   console.log(user.bestFriend._id) // typescript knows this is populated
 * }
 * ```
 */
export type PopulatedDocument<DocType, T> = T extends keyof DocType
  ? PopulatedProperty<DocType, T>
  : ParentProperty<T> extends keyof DocType
  ? Omit<DocType, ParentProperty<T>> & {
      [ref in ParentProperty<T>]: DocType[ParentProperty<T>] extends mongoose.Types.Array<
        infer U
      >
        ? mongoose.Types.Array<
            ChildProperty<T> extends keyof U
              ? PopulatedProperty<U, ChildProperty<T>>
              : PopulatedDocument<U, ChildProperty<T>>
          >
        : ChildProperty<T> extends keyof DocType[ParentProperty<T>]
        ? PopulatedProperty<DocType[ParentProperty<T>], ChildProperty<T>>
        : PopulatedDocument<DocType[ParentProperty<T>], ChildProperty<T>>;
    }
  : DocType;

/**
 * Helper types used by the populate overloads
 */
type Unarray<T> = T extends Array<infer U> ? U : T;
type Modify<T, R> = Omit<T, keyof R> & R;

/**
 * Augment mongoose with Query.populate overloads
 */
declare module "mongoose" {
  interface Query<ResultType, DocType, THelpers = {}> {
    populate<T extends string>(
      path: T,
      select?: string | any,
      model?: string | Model<any, THelpers>,
      match?: any
    ): Query<
      ResultType extends Array<DocType>
        ? Array<PopulatedDocument<Unarray<ResultType>, T>>
        : ResultType extends DocType
        ? PopulatedDocument<Unarray<ResultType>, T>
        : ResultType,
      DocType,
      THelpers
    > &
      THelpers;

    populate<T extends string>(
      options: Modify<PopulateOptions, { path: T }> | Array<PopulateOptions>
    ): Query<
      ResultType extends Array<DocType>
        ? Array<PopulatedDocument<Unarray<ResultType>, T>>
        : ResultType extends DocType
        ? PopulatedDocument<Unarray<ResultType>, T>
        : ResultType,
      DocType,
      THelpers
    > &
      THelpers;
  }
}
