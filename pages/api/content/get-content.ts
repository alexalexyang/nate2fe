import { NextApiRequest, NextApiResponse } from "next";

import { ContentProps } from "../../../types/types";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import { getMovieDetails } from "./helpers";
import languages from "../../../apps/nomurica/languages_ISO639-1_Alpha2.json";

interface MoviesFetchProps {
  total_pages: string;
  results: ContentProps[];
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

export default async function getSwipeContent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const movies = await getMovies(languages, parseInt("3"));

    const moviesFormatted = movies.map((movie: any) => ({
      id: movie.id,
      originalTitle: movie.original_title,
      title: movie.title,
      releaseDate: movie.release_date,
      productionCountries: movie.productionCountries,
      languages: [movie.original_language],
      images: movie.images,
      trailers: movie.trailers,
      synopsis: movie.overview,
      editOn: [
        { org: "TMDB", url: `https://www.themoviedb.org/movie/${movie.id}` },
      ],
    }));

    res.status(200).json(moviesFormatted);
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
}

// const placeHolder: ContentProps[] = [
//   {
//     id: "100001",
//     originalTitle: "Wall'n E Hole",
//     title: "Hole in the wall",
//     releaseDate: "2021-08-23",
//     productionCountries: ["Moldova", "Ghana"],
//     languages: ["English", "Hindi"],
//     images: [
//       "https://images.unsplash.com/photo-1614818053828-2bc471f3221e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixlib=rb-1.2.1&q=80&w=800",
//       "https://images.unsplash.com/photo-1615452879256-3d3363bfa5c2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=600",
//     ],
//     trailers: [
//       { url: "196742980", type: "vimeo" },
//       { url: "f6dT-Gq-G0k", type: "youtube" },
//     ],
//     synopsis:
//       "Howl uncontrollably for no reason i just saw other cats inside the house and nobody ask me before using my litter box but love and coo around boyfriend who purrs and makes the perfect moonlight eyes so i can purr and swat the glittery gleaming yarn to him (the yarn is from a $125 sweater) groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked for sleep but find something else more interesting to pet a cat, rub its belly, endure blood and agony, quietly weep, keep rubbing belly.",
//     likes: 400,
//     editOn: [{ org: "TMDB", url: "https://www.themoviedb.org/movie/100001" }],
//   },
//   {
//     id: "https://www.themoviedb.org/movie",
//     originalTitle: "Huntin' on e Beach",
//     title: "The Beach is Hunting",
//     releaseDate: "2021-08-23",
//     productionCountries: ["Indonesia", "Ethiopia", "Malaysia"],
//     languages: ["English", "Japanese"],
//     images: [],
//     trailers: [
//       {
//         url: "vPphwIskI8I",
//         type: "youtube",
//       },
//     ],
//     synopsis:
//       "Intrigued by the shower going to catch the red dot today going to catch the red dot today. Where is my slave? I'm getting hungry get scared by sudden appearance of cucumber this cat happen now, it was too purr-fect!!! groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked.",
//     likes: 400,
//     editOn: [{ org: "TMDB", url: "https://www.themoviedb.org/movie/100001" }],
//   },
//   {
//     id: "100003",
//     originalTitle: "Apparently a Book",
//     title: "A Book It Is",
//     releaseDate: "2039",
//     languages: ["English"],
//     images: [
//       "https://images.unsplash.com/photo-1613510456351-ae50a32038a9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixlib=rb-1.2.1&q=80&w=800",
//       "https://images.unsplash.com/photo-1613638377394-281765460baa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=600",
//     ],
//     synopsis:
//       "Miaow then turn around and show you my bum cats making all the muffins. My water bowl is clean and freshly replenished, so i'll drink from the toilet refuse to drink water except out of someone's glass for warm up laptop with butt lick butt fart rainbows until owner yells pee in litter box hiss at cats and the dog smells bad yet try to hold own back foot to clean it but foot reflexively kicks you in face, go into a rage and bite own foot, hard. Cough furball into food bowl then scratch owner for a new one love me!",
//     likes: 400,
//     authors: ["Mr Syukur"],
//   },
//   {
//     id: "100004",
//     originalTitle: "Anoter bok",
//     title: "Book Another One Is",
//     releaseDate: "1943",
//     languages: ["Polish"],
//     images: [
//       "https://images.unsplash.com/photo-1613470651441-9f59d6918dd6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=600",
//     ],
//     synopsis:
//       "Meow in empty rooms lick sellotape what the heck just happened, something feels fishy and allways wanting food scratch the postman wake up lick paw wake up owner meow meow eat the rubberband always hungry. Floof tum, tickle bum, jellybean footies curly toes.",
//     likes: 400,
//     authors: ["Giorgi Urushadze"],
//     editOn: [
//       { org: "TMDB", url: "https://www.themoviedb.org/movie/100001" },
//       { org: "ReadMePls", url: "https://example.com" },
//     ],
//   },
// ];
