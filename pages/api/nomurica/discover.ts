import { NextApiRequest, NextApiResponse } from "next";

import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import languages from "../../../projects/nomurica/languages_ISO639-1_Alpha2.json";

const { serverRuntimeConfig } = getConfig();

type LangType = typeof languages;

const getLanguages = (languages: LangType, num: number) => {
  const choices: string[] = [];

  let counter = num;
  while (counter !== 0) {
    const index = Math.floor(Math.random() * languages.length);

    if (!choices.includes(languages[index].code)) {
      choices.push(languages[index].code);
      counter--;
    } else {
      continue;
    }
  }
  return choices;
};

export default async function shows(req: NextApiRequest, res: NextApiResponse) {
  // const { genre } = req.query;

  const numOfCalls = 6;

  const langs = getLanguages(languages, numOfCalls);

  // Send to api
  const tmdbV3 = `api_key=${serverRuntimeConfig.TMDB_V3}`;
  const baseUrl = `https://api.themoviedb.org/3/discover/movie`;
  const sortBy = `&sort_by=popularity.desc`;
  const adult = `&include_adult=false`;

  // It seems video is always false in the response data. Acquire trailer in other ways?
  const video = `&include_video=false`;

  try {
    let results = await Promise.all(
      langs.map(async (code) => {
        const originalLanguage = `&with_original_language=${code}`;
        const firstCallUrl = `${baseUrl}?${tmdbV3}${adult}${originalLanguage}`;

        const response = await fetch(firstCallUrl);
        const data = await response.json();

        if (data.results && data.results.length) {
          const pages = data.total_pages + 1;
          const randomPage = Math.floor(Math.random() * pages);
          const page = `&page=${randomPage != 0 ? randomPage : 1}`;
          const tmdbAPI = `${baseUrl}?${tmdbV3}${sortBy}${adult}${video}${page}${originalLanguage}`;
          const response = await fetch(tmdbAPI);
          const movies = await response.json();

          if (movies.results && movies.results.length) {
            const index = Math.floor(Math.random() * movies.results.length);
            const picked = movies.results[index];

            const getTrailers = await fetch(
              `https://api.themoviedb.org/3/movie/${picked.id}/videos?${tmdbV3}`
            );
            const trailers = await getTrailers.json();

            if (trailers.results.length) {
              const youtubeLink = `https://www.youtube.com/embed/${trailers.results[0].key}`;
              picked.trailer = youtubeLink;
            }

            const getDetails = await fetch(
              `https://api.themoviedb.org/3/movie/${picked.id}?${tmdbV3}`
            );
            const details = await getDetails.json();

            if (details.production_countries.length) {
              const production_countries = details.production_countries.map(
                (country: any) => country.name
              );
              picked.production_countries = production_countries;
            }

            return picked;
          }
        }
      })
    );

    res.status(200).json(results.filter((movie) => movie != null));
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
}
