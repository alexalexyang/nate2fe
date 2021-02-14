import React, { useEffect, useState } from "react";

import Layout from "../Layout";
import MovieCard from "../movie-card";
import { MovieProps } from "../types";
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
      <h1>POPULARITY</h1>

      {movies && renderMovies}
    </Layout>
  );
};

export default TopMovies;
