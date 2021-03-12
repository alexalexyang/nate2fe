import { noFunc, yesFunc } from "./swipe-functions";

import MovieCard from "../movie-card";
import { NextPage } from "next";
import React from "react";
import SwipeGroup from "../../../components/SwipeGroup";
import { Wrapper } from "./swipe-mode-styles";

const SwipeMode: NextPage = () => (
  <Wrapper>
    <SwipeGroup
      Render={MovieCard as any}
      noFunc={noFunc}
      yesFunc={yesFunc}
      fetchUrl={`/api/nomurica/discover?numOfMovies=${5}`}
    />
  </Wrapper>
);

export default SwipeMode;
