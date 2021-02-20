import React, { useEffect, useState } from "react";

import { Container } from "@material-ui/core";
import Head from "../../../components/Head";
import Layout from "../Layout";
import MovieCard from "../movie-card";
import { MovieProps } from "../types";
import { MoviesWrapper } from "../movie-card-styles";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";

const TopMovies: NextPage = () => {
  const [movies, setMovies] = useState<MovieProps[]>();

  useEffect(() => {
    const getMovies = async () => {
      const fetched = await (await fetch(`/api/nomurica/get-movies`)).json();

      setMovies(fetched.movies);
    };

    getMovies();
  }, []);

  const renderMovies =
    movies && movies.map((movie) => <MovieCard key={movie.id} item={movie} />);

  return (
    <Layout>
      <Head page="Top Movies | Nomurica" />
      <Container>
        <h1>Top Movies</h1>
      </Container>
      {movies && (
        <Container>
          <MoviesWrapper>{renderMovies} </MoviesWrapper>
        </Container>
      )}
    </Layout>
  );
};

export default TopMovies;
