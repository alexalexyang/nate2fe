import { NextApiRequest, NextApiResponse } from "next";

import { MovieProps } from "../../../projects/nomurica/types";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import languages from "../../../projects/nomurica/languages_ISO639-1_Alpha2.json";
import { getMovieDetails } from "./helpers";

interface MoviesFetchProps {
  total_pages: string;
  results: MovieProps[];
}

const { serverRuntimeConfig } = getConfig();

type LangType = typeof languages;

// Send to api
const tmdbV3 = `api_key=${serverRuntimeConfig.TMDB_V3}`;
const baseUrl = `https://api.themoviedb.org/3/discover/movie`;
const sortBy = `&sort_by=popularity.desc`;
const adult = `&include_adult=false`;

// It seems video is always false in the response data. Acquire trailer in other ways?
const video = `&include_video=false`;

const pickRandomLanguage = (languages: LangType) => {
  const index = Math.floor(Math.random() * languages.length);
  return languages[index].code;
};

const fetchMoviesfromRandomPage = async (
  total_pages: number,
  originalLanguage: string
) => {
  const pages = total_pages + 1;
  const randomPage = Math.floor(Math.random() * pages);
  const page = `&page=${randomPage != 0 ? randomPage : 1}`;

  const response = await fetch(
    `${baseUrl}?${tmdbV3}${sortBy}${adult}${video}${page}${originalLanguage}`
  );
  return await response.json();
};

const getMovie = async (
  moviesByLanguage: MoviesFetchProps,
  originalLanguage: string
) => {
  if (moviesByLanguage.results && moviesByLanguage.results.length) {
    const movies = await fetchMoviesfromRandomPage(
      parseInt(moviesByLanguage!.total_pages),
      originalLanguage
    );

    if (movies.results && movies.results.length) {
      const index = Math.floor(Math.random() * movies.results.length);
      const picked = movies.results[index];

      return await getMovieDetails(picked, tmdbV3);
    }

    return null;
  }
};

const getMovies = async (languages: LangType, numOfMovies: number) => {
  let usedLanguages: string[] = [];
  let movies = [];

  while (numOfMovies != 0) {
    const code = pickRandomLanguage(languages);
    if (usedLanguages.includes(code)) {
      continue;
    }
    usedLanguages.push(code);

    const originalLanguage = `&with_original_language=${code}`;

    const getMoviesbyLanguage = await fetch(
      `${baseUrl}?${tmdbV3}${adult}${originalLanguage}`
    );
    const moviesByLanguage = await getMoviesbyLanguage.json();

    const movie = await getMovie(moviesByLanguage, originalLanguage);

    if (!movie) {
      continue;
    }

    movies.push(movie);
    numOfMovies--;
  }
  return movies;
};

export default async function discoverMovies(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { numOfMovies } = req.query;

  try {
    const movies = await getMovies(languages, parseInt(<string>numOfMovies));

    res.status(200).json(movies.filter((movie) => movie != null));
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
}
