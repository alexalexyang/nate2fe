import mongoose from "mongoose";

export const MoviesSchema = new mongoose.Schema(
  {
    tmdb_id: String,
    title: String,
    likes: Number,
  },
  { timestamps: true }
);

export const MoviesModel = mongoose.model("movies", MoviesSchema);
