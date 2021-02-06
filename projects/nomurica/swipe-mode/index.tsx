import { noFunc, yesFunc } from "./swipe-functions";

import MovieCard from "../movie-card";
import { MovieProps } from "../types";
import { NextPage } from "next";
import React from "react";
import SwipeGroup from "../../../components/SwipeGroup";

const SwipeMode: NextPage = () => (
  <SwipeGroup<MovieProps, {}>
    Render={MovieCard}
    noFunc={noFunc}
    yesFunc={yesFunc}
  />
);

export default SwipeMode;
