import { noFunc, yesFunc } from "./swipe-functions";

import Layout from "../Layout";
import MovieCard from "../movie-card";
import { MovieProps } from "../types";
import { NextPage } from "next";
import React from "react";
import { Summary } from "../movie-card-styles";
import SwipeGroup from "../../../components/SwipeGroup";
import { Wrapper } from "./swipe-mode-styles";

export const SummaryCard: NextPage<{ item: MovieProps }> = ({
  item,
}: {
  item: MovieProps;
}) => {
  return (
    <Summary>
      <MovieCard item={item} />
    </Summary>
  );
};

const SwipeMode: NextPage = () => (
  <Layout>
    <Wrapper>
      <SwipeGroup
        Render={SummaryCard as any}
        noFunc={noFunc}
        yesFunc={yesFunc}
        fetchUrl={`/api/nomurica/discover?numOfMovies=${5}`}
      />
    </Wrapper>
  </Layout>
);

export default SwipeMode;
