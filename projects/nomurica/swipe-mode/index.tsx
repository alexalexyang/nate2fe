import { noFunc, yesFunc } from "./swipe-functions";

import Layout from "../Layout";
import MovieCard from "../movie-card";
import { MovieProps } from "../types";
import { NextPage } from "next";
import React from "react";
import SwipeGroup from "../../../components/SwipeGroup";
import { Wrapper } from "./swipe-mode-styles";

const SwipeMode: NextPage = () => (
  <Layout>
    <Wrapper>
      <SwipeGroup<MovieProps, {}>
        Render={MovieCard as any}
        noFunc={noFunc}
        yesFunc={yesFunc}
        fetchUrl={`/api/nomurica/discover?numOfMovies=${5}`}
      />
    </Wrapper>
  </Layout>
);

export default SwipeMode;
