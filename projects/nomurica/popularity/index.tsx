import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import Loading from "../../../components/Loading";
import MovieCard from "../movie-card";
import { MoviePopularity } from "../types";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";

const Popularity: NextPage = () => {
  const [movies, setMovies] = useState<MoviePopularity[]>();
  const getMovies = async () => {
    const fetched = await (await fetch(`/api/db-movies/popularity`)).json();
    console.log(fetched.movies);
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
    <>
      <button onClick={getMovies}>
        <h1>POPULARITY</h1>
      </button>
      {movies && renderMovies}
    </>
  );
};

export default Popularity;
