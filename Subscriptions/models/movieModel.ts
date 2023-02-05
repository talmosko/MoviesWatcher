import mongoose from "mongoose";
import {
  MovieDocument,
  MovieModel,
  MovieSchema,
} from "../interfaces/mongoose.gen";

// 'Schema' maps to a MongoDB collection and defines the shape of the documents within that collection
// 'Schema' is the blueprint of the documents
const movieSchema: MovieSchema = new mongoose.Schema(
  {
    externalId: Number,
    name: String,
    genres: [String],
    image: String,
    premiered: Date,
  },
  { versionKey: false }
);

// A 'model' is a class with which we construct documents in a collection
const Movie = mongoose.model<MovieDocument, MovieModel>("Movie", movieSchema);
// The first argument is the singular name of the collection that will be created for the model (Mongoose will create the database collection for the above model 'person').
// The second argument is the schema to use in creating the model.

export default Movie;
