"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissions = exports.PermissionsTypes = void 0;
exports.PermissionsTypes = [
    "View Subscriptions",
    "Create Subscriptions",
    "Update Subscriptions",
    "Delete Subscriptions",
    "View Movies",
    "Create Movies",
    "Update Movies",
    "Delete Movies",
    "Site Admin",
];
exports.UserPermissions = {
    ViewSubscriptions: exports.PermissionsTypes[0],
    CreateSubscriptions: exports.PermissionsTypes[1],
    UpdateSubscriptions: exports.PermissionsTypes[2],
    DeleteSubscriptions: exports.PermissionsTypes[3],
    ViewMovies: exports.PermissionsTypes[4],
    CreateMovies: exports.PermissionsTypes[5],
    UpdateMovies: exports.PermissionsTypes[6],
    DeleteMovies: exports.PermissionsTypes[7],
    SiteAdmin: exports.PermissionsTypes[8],
};
