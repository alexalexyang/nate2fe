import { MovieType, RequestStatus, SetProps } from "../types";
import React, { useEffect, useState } from "react";
import { StyledDiv, Wrapper } from "./swipe-mode-styles";
import { fetchIfEmpty, switchSet } from "./helpers";
import { setSwitchButtons, setSwitchCards } from "./content-components";

import { NextPage } from "next";

const initialState = {
  status: RequestStatus.Idle,
  data: undefined,
  message: undefined,
  fetchStatus: RequestStatus.Idle,
};

const SwipeMode: NextPage = () => {
  const fetchUrl = `/api/nomurica/discover?numOfMovies=${5}`;
  const [set1, setSet1] = useState<SetProps<MovieType>>(initialState);
  const [set2, setSet2] = useState<SetProps<MovieType>>(initialState);
  const [displaySet, setDisplaySet] = useState<string>("set1");

  useEffect(() => {
    fetchIfEmpty<MovieType>(set1, setSet1, fetchUrl);
    fetchIfEmpty<MovieType>(set2, setSet2, fetchUrl);

    switchSet<MovieType>(set1, set2, setDisplaySet);
  }, [set1, set2]);

  return (
    <Wrapper>
      <StyledDiv>
        {setSwitchCards({ displaySet, set1, setSet1, set2, setSet2 })}
      </StyledDiv>
      {setSwitchButtons({ displaySet, set1, setSet1, set2, setSet2 })}
    </Wrapper>
  );
};

export default SwipeMode;
