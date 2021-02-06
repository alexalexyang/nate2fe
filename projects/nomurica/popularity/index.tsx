import React, { useState } from "react";

import Layout from "../Layout";
import { MoviePopularity } from "../types";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";

const Popularity: NextPage = () => {
  const [movies, setMovies] = useState<MoviePopularity[]>();
  const getMovies = async () => {
    const fetched = await (await fetch(`/api/db-movies/popularity`)).json();

    setMovies(fetched.movies);
  };

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
      <button onClick={getMovies}>
        <h1>POPULARITY</h1>
      </button>
      {movies && renderMovies}
    </Layout>
  );
};

export default Popularity;
