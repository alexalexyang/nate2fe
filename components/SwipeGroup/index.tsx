import {
  ContentRequest,
  RenderComponentProps,
  RequestStatus,
} from "../../types/types";
import React, { useEffect, useState } from "react";
import { fetchIfEmpty, switchSet } from "./helpers";
import { setSwitchButtons, setSwitchCards } from "./content-components";

import { StyledDiv } from "./swipe-mode-styles";

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
  fetchUrl: string;
}

const SwipeGroup = <T extends object, Extra extends object>({
  Render,
  yesFunc,
  noFunc,
  fetchUrl,
}: SwipeModeProps<T, Extra>) => {
  const [set1, setSet1] = useState<ContentRequest<T[]>>(initialState);
  const [set2, setSet2] = useState<ContentRequest<T[]>>(initialState);
  const [displaySet, setDisplaySet] = useState<string>("set1");

  useEffect(() => {
    fetchIfEmpty<T>(set1, setSet1, fetchUrl);
    fetchIfEmpty<T>(set2, setSet2, fetchUrl);

    switchSet<T>(set1, set2, setDisplaySet);
  }, [set1, set2]);

  return (
    <>
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
    </>
  );
};

export default SwipeGroup;
