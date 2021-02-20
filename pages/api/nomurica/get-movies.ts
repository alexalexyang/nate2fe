import { NextApiRequest, NextApiResponse } from "next";

import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import { getMovieDetails } from "./helpers";
import { moviesCollection } from "../db-movies/db-connection";

const { serverRuntimeConfig } = getConfig();
const tmdbV3 = `api_key=${serverRuntimeConfig.TMDB_V3}`;
const baseUrl = `https://api.themoviedb.org/3/movie`;

const getMovies = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const moviesConn = await moviesCollection();
    const moviesfromDb = await moviesConn
      .find({})
      .sort({ likes: -1 })
      .limit(5)
      .toArray();

    const fetchedMovies = await moviesfromDb.map(async (movie: any) => {
      const currentMovie = await (
        await fetch(`${baseUrl}/${movie.tmdb_id}?${tmdbV3}`)
      ).json();

      const fullMovie = await getMovieDetails(currentMovie, tmdbV3);

      if (fullMovie) {
        fullMovie.likes = movie.likes;
      }

      return fullMovie;
    });

    const movies = await Promise.all(fetchedMovies);

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

export default getMovies;
