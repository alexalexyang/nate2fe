import { ContentProps } from "../../../types/types";

const banned = [
  "United States of America",
  "United Kingdom",
  "United Kingdom of Great Britain and Northern Ireland",
  "China",
  // "Hong Kong",
];

export const getMovieDetails = async (movie: ContentProps, tmdbV3: string) => {
  const trailers = await (
    await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?${tmdbV3}`
    )
  ).json();
  if (trailers && trailers.results && trailers.results.length) {
    movie.trailers = trailers.results.map(
      (trailer: { key: string; site: string }) => ({
        url: trailer.key,
        type: trailer.site.toLowerCase(),
      })
    );
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

    movie.productionCountries = production_countries;
  }
  return movie;
};
