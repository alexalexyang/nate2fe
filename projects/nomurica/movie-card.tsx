import FullScreen from "./full-screen";
import { MoviesProps } from "./types";
import { NextPage } from "next";
import { StyledCard } from "./movie-card-styles";

const MovieCard: NextPage<MoviesProps> = ({ movie }: MoviesProps) => {
  return movie ? (
    <StyledCard key={movie.id}>
      <StyledCard.Header>
        {movie.title && <h3>Title: {movie.title}</h3>}
        {movie.original_title && (
          <h3>Original title: {movie.original_title}</h3>
        )}
        {movie.release_date && <p>Release date: {movie.release_date}</p>}
        {movie.production_countries && (
          <p>
            Production countries:{" "}
            {movie.production_countries.map((country, idx) => (
              <span key={country}>
                {country}
                {!(movie.production_countries.length === idx + 1) && ", "}
              </span>
            ))}
          </p>
        )}
      </StyledCard.Header>

      <StyledCard.Body>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={`Poster for ${movie.original_title}`}
          />
        )}
        <FullScreen movie={movie} />
        <p>{movie.overview}</p>
      </StyledCard.Body>
      <StyledCard.Footer>
        <a
          href={`https://www.themoviedb.org/movie/${movie.id}`}
          target="__blank"
        >
          Edit on TMDB
        </a>
      </StyledCard.Footer>
    </StyledCard>
  ) : null;
};

export default MovieCard;
