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
const express_1 = require("express");
const moviesBLL = __importStar(require("../BLL/moviesBLL"));
const authMiddlewares = __importStar(require("../middlewares/authMiddlewares"));
const router = (0, express_1.Router)();
//Endpoint localhost:3000/movies
// Navigation
router.get("/add-movie", authMiddlewares.jwtMiddleware, authMiddlewares.isAuth, moviesBLL.getAddMoviePage);
router.get("/edit-movie/:movieId", authMiddlewares.jwtMiddleware, authMiddlewares.isAuth, moviesBLL.getEditMoviePage);
// CRUD - Create, Read, Update, Delete
router.get("/", authMiddlewares.jwtMiddleware, authMiddlewares.isAuth, moviesBLL.getAllMovies);
router.get("/:movieId", authMiddlewares.jwtMiddleware, authMiddlewares.isAuth, moviesBLL.getMovieById);
router.post("/", authMiddlewares.jwtMiddleware, authMiddlewares.isAuth, moviesBLL.addMovie);
router.put("/:movieId", authMiddlewares.jwtMiddleware, authMiddlewares.isAuth, moviesBLL.updateMovie);
router.delete("/:movieId", authMiddlewares.jwtMiddleware, authMiddlewares.isAuth, moviesBLL.deleteMovie);
exports.default = router;
