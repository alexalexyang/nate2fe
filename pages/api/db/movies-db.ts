import { NextApiRequest, NextApiResponse } from "next";

import { MoviesModel } from "./movies-model";
import { connectDB } from "./db-connection";

const moviesToDB = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    connectDB();
    const { movie_id } = req.query;

    MoviesModel.findOne(
      { tmdb_id: movie_id },
      (err: Error, foundMovie: any) => {
        if (err) {
          throw err;
        }

        if (!foundMovie) {
          return MoviesModel.create({ tmdb_id: movie_id, likes: 1 });
        }

        foundMovie.likes = foundMovie.likes + 1;

        foundMovie.save((err: Error) => {
          if (err) {
            throw err;
          }
        });
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log("ERROR");
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
};

export default moviesToDB;
