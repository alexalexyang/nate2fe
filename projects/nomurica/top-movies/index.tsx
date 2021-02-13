import React, { useEffect, useState } from "react";

import Layout from "../Layout";
import { MoviePopularity } from "../types";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";

const TopMovies: NextPage = () => {
  const [movies, setMovies] = useState<MoviePopularity[]>();

  useEffect(() => {
    const getMovies = async () => {
      const fetched = await (await fetch(`/api/db-movies/popularity`)).json();

      setMovies(fetched.movies);
    };

    getMovies();
  }, []);

  const renderMovies =
    movies &&
    movies.map((movie) => (
      <div key={movie.tmdb_id}>
        <h2>
          {movie.title}: {movie.likes} likes
        </h2>
      </div>
    ));

  return (
    <Layout>
      <h1>POPULARITY</h1>

      {movies && renderMovies}
    </Layout>
  );
};

export default TopMovies;
