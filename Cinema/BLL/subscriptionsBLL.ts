import { RequestHandler } from "express";
import * as moviesWS from "../DAL/moviesWS";
import {
  RequestWithUserPermissions,
  SubscriptionObject,
  UserPermissions,
} from "../types/subscriptionsTypes";
import * as subscriptionWS from "../DAL/subscriptionsWS";
import { ObjectId, Schema } from "mongoose";

const getSubscribeForm: RequestHandler = async (req, res, next) => {
  try {
    //check 'Create Subscriptions' permission
    const userPermissions = (req as RequestWithUserPermissions).userPermissions!
      .permissions;
    if (!userPermissions.includes(UserPermissions.CreateSubscriptions)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    //gets all movies
    const memberId = req.params.memberId;
    const movies = await moviesWS.getMovies();

    //get all subscriptions by member id
    const subscriptions = await subscriptionWS.getSubscriptionsByMemberId(
      memberId
    );

    // get all subscribed movies _id array
    const subscribedMovies = [] as ObjectId[];
    subscriptions.forEach((subscription) => {
      subscription.movies?.forEach((movie) => {
        subscribedMovies.push(movie.movieId._id);
      });
    });
    console.log(subscribedMovies);

    //filter movies that are already subscribed to
    const filteredMovies = movies.filter((movie) => {
      return !subscribedMovies.includes(movie._id);
    });

    res.render("subscriptions/subscribe-form", {
      movies: filteredMovies,
      memberId: memberId,
    });
  } catch (err: any) {
    next(err);
  }
};

const postSubscription: RequestHandler = async (req, res, next) => {
  try {
    //check 'Create Subscriptions' permission
    const userPermissions = (req as RequestWithUserPermissions).userPermissions!
      .permissions;
    if (!userPermissions.includes(UserPermissions.CreateSubscriptions)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const subscription: SubscriptionObject = req.body as SubscriptionObject;
    await subscriptionWS.postSubscription(subscription);
    res.redirect("/subscriptions");
  } catch (err: any) {
    next(err);
  }
};

export { getSubscribeForm, postSubscription };
