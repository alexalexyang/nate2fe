import { Box, Button, Container } from "@material-ui/core";

import Head from "../../components/Head";
import Loading from "../../components/Loading";
import { MovieProps } from "./types";
import Movies from "./movies";
import { NextPage } from "next";
import PlayLottie from "../../utils/play-lottie";
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

const MoviesWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  height: 100%;

  @media (min-width: 750px) {
    height: 2000px;

    > * {
      width: 45%;
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
  }
`;

const CenterChildren = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchButton = styled(Button)`
  border-radius: 100px;
  font-size: 30px;
  color: #575757;
`;

let Search = require(`../../assets/search-file.json`);

const Nomurica: NextPage = () => {
  const TmdbLogo = require(`./tmdb_logo.svg`).default;

  const intro = require(`./readme.md`);
  const content = converter.makeHtml(intro.default);

  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieProps[]>();

  const getMovies = async () => {
    setLoading(true);
    const movies = await (
      await fetch(`/api/nomurica/discover?numOfMovies=6`)
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
        <CenterChildren>
          {loading ? (
            <>
              <Loading />
              <h2>{`This is you. This is how you wait.`}</h2>
            </>
          ) : (
            <SearchButton
              onClick={getMovies}
              size="large"
              variant="contained"
              color="primary"
            >
              Get Movies
              {PlayLottie(Search, 100, 100)}
            </SearchButton>
          )}
        </CenterChildren>

        {movies && !loading ? (
          <>
            <Container>
              <h2>Movies</h2>
              <MoviesWrapper>
                <Movies {...movies} />
              </MoviesWrapper>
            </Container>
          </>
        ) : null}
      </Box>
    </>
  );
};

export default Nomurica;
