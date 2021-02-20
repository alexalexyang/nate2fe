import React, { useEffect, useState } from "react";

import { Container } from "@material-ui/core";
import Head from "../../../components/Head";
import Layout from "../Layout";
import Loading from "../../../components/Loading";
import MovieCard from "../movie-card";
import { MovieProps } from "../types";
import { MoviesWrapper } from "../movie-card-styles";
import { NextPage } from "next";
import PlayLottie from "../../../utils/play-lottie";
import fetch from "isomorphic-unfetch";

const TopMovies: NextPage = () => {
  const [movies, setMovies] = useState<MovieProps[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const fetched = await (await fetch(`/api/nomurica/get-movies`)).json();

      setMovies(fetched.movies);
      setLoading(false);
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
      {loading && <Loading />}
      {movies && (
        <Container>
          <MoviesWrapper>{renderMovies}</MoviesWrapper>
        </Container>
      )}
    </Layout>
  );
};

export default TopMovies;
