import { MovieProps } from "../../../apps/nomurica/types";

const banned = [
  "United States of America",
  "United Kingdom",
  "United Kingdom of Great Britain and Northern Ireland",
  "China",
  "Hong Kong",
];

export const getMovieDetails = async (movie: MovieProps, tmdbV3: string) => {
  const getTrailers = await fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}/videos?${tmdbV3}`
  );
  const trailers = await getTrailers.json();

  if (trailers && trailers.results && trailers.results.length) {
    const trailerInfo = trailers.results;
    movie.trailer = trailerInfo[0].key;
    movie.trailerType = trailerInfo[0].site;
  }

  const getDetails = await fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}?${tmdbV3}`
  );
  const details = await getDetails.json();

  if (details.production_countries && details.production_countries.length) {
    const production_countries = details.production_countries.map(
      (country: any) => country.name
    );

    // Return if production countries are only from banned countries.
    if (
      banned.some(
        (country) =>
          production_countries.filter((pc: string) => pc !== country).length ===
          0
      )
    ) {
      return;
    }

    movie.production_countries = production_countries;
  }
  return movie;
};
