import { NextApiRequest, NextApiResponse } from "next";

import { moviesCollection } from "./db-connection";

const popularity = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const moviesConn = await moviesCollection();
    const movies = await moviesConn
      .find({})
      .sort({ likes: -1 })
      .limit(5)
      .toArray();

    console.log(movies);

    res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
};

export default popularity;
