import { Card, Center, Poster, StyledCard } from "./movie-card-styles";

import FullScreen from "./full-screen";
import { MovieProps } from "./types";
import { NextPage } from "next";

const MovieCard: NextPage<{ item: MovieProps }> = ({
  item,
}: {
  item: MovieProps;
}) => {
  return item ? (
    <Card key={item.id}>
      <StyledCard>
        <StyledCard.Header>
          {item.likes && (
            <p>
              {item.likes}{" "}
              <span role="img" aria-label="Likes">
                ❤️
              </span>
            </p>
          )}
          {item.title && <h3>Title: {item.title}</h3>}
          {item.original_title && (
            <h3>Original title: {item.original_title}</h3>
          )}

          {item.release_date && <p>Release date: {item.release_date}</p>}
          {item.production_countries && item.production_countries.length != 0 && (
            <p>
              Production countries:{" "}
              {item.production_countries.map((country, idx) => (
                <span key={country}>
                  {country}
                  {!(item.production_countries.length === idx + 1) && ", "}
                </span>
              ))}
            </p>
          )}
        </StyledCard.Header>

        <StyledCard.Body>
          {item.poster_path && (
            <Center>
              <Poster
                url={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                alt={`Poster for ${item.original_title}`}
              />
            </Center>
          )}
          <FullScreen item={item} />
          <p>{item.overview}</p>
        </StyledCard.Body>
        <StyledCard.Footer>
          <a
            href={`https://www.themoviedb.org/movie/${item.id}`}
            target="__blank"
          >
            Edit on TMDB
          </a>
        </StyledCard.Footer>
      </StyledCard>
    </Card>
  ) : null;
};

export default MovieCard;
