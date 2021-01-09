import { Box, Button, Container } from "@material-ui/core";

import Head from "../../components/Head";
import Loading from "../../components/Loading";
import Movies from "./movies";
import { MoviesType } from "./types";
import { NextPage } from "next";
import SvgHelper from "../../components/SvgHelper";
import fetch from "isomorphic-unfetch";
import showdown from "showdown";
import styled from "styled-components";
import { useState } from "react";

const converter = new showdown.Converter({
  simpleLineBreaks: true,
  tables: true,
  noHeaderId: true,
});

const StyledContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;

const Nomurica: NextPage = () => {
  const TmdbLogo = require(`./tmdb_logo.svg`).default;

  const intro = require(`./readme.md`);
  const content = converter.makeHtml(intro.default);

  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<MoviesType>(null);

  const getMovies = async () => {
    setLoading(true);
    const movies = await (
      await fetch(`/api/nomurica/discover?genre=sciencefiction`)
    ).json();
    setMovies(movies);
    setLoading(false);
  };

  return (
    <>
      <Head page="Nomurica" />
      <Box>
        <Container>
          <h1>Nomurica</h1>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
          <a href="https://www.themoviedb.org/" target="__blank">
            <SvgHelper fontSize={70}>
              <TmdbLogo />
            </SvgHelper>
          </a>
        </Container>
        <Container>
          <Button
            onClick={getMovies}
            size="large"
            variant="contained"
            color="primary"
          >
            Get Movies
          </Button>
        </Container>
        {loading && (
          <>
            <Loading />
            <h2>
              {`Pardon the wait. I'm processing lots of stuff in the background.`}
            </h2>
          </>
        )}
        {movies && !loading ? (
          <>
            <Container>
              <h2>Movies</h2>
              <StyledContainer>
                <Movies movies={movies} />
              </StyledContainer>
            </Container>
            <Container>
              <h2>JSON</h2>
              <pre>{JSON.stringify(movies, null, 2)}</pre>
            </Container>
          </>
        ) : null}
      </Box>
    </>
  );
};

export default Nomurica;
