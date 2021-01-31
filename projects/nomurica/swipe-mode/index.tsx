import React, { useEffect, useState } from "react";
import { RequestStatus, SetProps } from "./data-types";
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
  const [set1, setSet1] = useState<SetProps>(initialState);
  const [set2, setSet2] = useState<SetProps>(initialState);
  const [displaySet, setDisplaySet] = useState<string>("set1");

  useEffect(() => {
    fetchIfEmpty(set1, setSet1);
    fetchIfEmpty(set2, setSet2);

    switchSet(set1, set2, setDisplaySet);
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
