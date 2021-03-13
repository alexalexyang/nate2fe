import { NextApiRequest, NextApiResponse } from "next";

import { moviesCollection } from "../db-movies/db-connection";

const likes = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { movie_id, movie_title } = req.query;

    const moviesConn = await moviesCollection();
    moviesConn.updateOne(
      {
        tmdb_id: movie_id,
      },
      {
        $set: { tmdb_id: movie_id, title: movie_title },
        $inc: { likes: 1 },
      },
      {
        upsert: true,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
};

export default likes;
