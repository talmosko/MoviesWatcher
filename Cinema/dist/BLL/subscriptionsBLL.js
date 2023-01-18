"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSubscription = exports.getSubscribeForm = void 0;
const moviesWS = __importStar(require("../DAL/moviesWS"));
const subscriptionWS = __importStar(require("../DAL/subscriptionsWS"));
const getSubscribeForm = async (req, res, next) => {
    try {
        //gets all movies
        const memberId = req.params.memberId;
        const movies = await moviesWS.getMovies();
        //get all subscriptions by member id
        const subscriptions = await subscriptionWS.getSubscriptionsByMemberId(memberId);
        // get all subscribed movies _id array
        const subscribedMovies = [];
        subscriptions.forEach((subscription) => {
            var _a;
            (_a = subscription.movies) === null || _a === void 0 ? void 0 : _a.forEach((movie) => {
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
    }
    catch (err) {
        next(err);
    }
};
exports.getSubscribeForm = getSubscribeForm;
const postSubscription = async (req, res, next) => {
    try {
        const subscription = req.body;
        await subscriptionWS.postSubscription(subscription);
        res.redirect("/subscriptions");
    }
    catch (err) {
        next(err);
    }
};
exports.postSubscription = postSubscription;
