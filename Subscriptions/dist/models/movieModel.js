"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// 'Schema' maps to a MongoDB collection and defines the shape of the documents within that collection
// 'Schema' is the blueprint of the documents
const movieSchema = new mongoose_1.default.Schema({
    externalId: Number,
    name: String,
    genres: [String],
    image: String,
    premiered: Date
}, { versionKey: false });
// A 'model' is a class with which we construct documents in a collection
const Movie = mongoose_1.default.model('movies', movieSchema);
// The first argument is the singular name of the collection that will be created for the model (Mongoose will create the database collection for the above model 'person').
// The second argument is the schema to use in creating the model.
exports.default = Movie;
