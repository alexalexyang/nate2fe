import {
  ContentRequest,
  RenderComponentProps,
  RequestStatus,
} from "../../types/types";
import React, { useEffect, useState } from "react";
import { StyledDiv, Wrapper } from "./swipe-mode-styles";
import { fetchIfEmpty, switchSet } from "./helpers";
import { setSwitchButtons, setSwitchCards } from "./content-components";

const initialState = {
  status: RequestStatus.Idle,
  data: undefined,
  message: undefined,
  fetchStatus: RequestStatus.Idle,
};

interface SwipeModeProps<T, Extra> {
  Render: RenderComponentProps<T, Extra>;
  yesFunc: any;
  noFunc: any;
}

const SwipeGroup = <T extends object, Extra extends object>({
  Render,
  yesFunc,
  noFunc,
}: SwipeModeProps<T, Extra>) => {
  const fetchUrl = `/api/nomurica/discover?numOfMovies=${5}`;
  const [set1, setSet1] = useState<ContentRequest<T[]>>(initialState);
  const [set2, setSet2] = useState<ContentRequest<T[]>>(initialState);
  const [displaySet, setDisplaySet] = useState<string>("set1");

  useEffect(() => {
    fetchIfEmpty<T>(set1, setSet1, fetchUrl);
    fetchIfEmpty<T>(set2, setSet2, fetchUrl);

    switchSet<T>(set1, set2, setDisplaySet);
  }, [set1, set2]);

  return (
    <Wrapper>
      <StyledDiv>
        {setSwitchCards<T, Extra>({
          displaySet,
          set1,
          setSet1,
          set2,
          setSet2,
          Render,
          yesFunc,
          noFunc,
        })}
      </StyledDiv>
      {setSwitchButtons({
        displaySet,
        set1,
        setSet1,
        set2,
        setSet2,
        yesFunc,
        noFunc,
      })}
    </Wrapper>
  );
};

export default SwipeGroup;
