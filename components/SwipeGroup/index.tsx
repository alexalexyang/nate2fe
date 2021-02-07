import { ButtonGroupSwitch, CardGroupSwitch } from "./content-components";
import { ButtonsWrapper, StyledDiv } from "./swipe-mode-styles";
import {
  ContentRequest,
  RenderComponent,
  RequestStatus,
} from "../../types/types";
import React, { useEffect, useState } from "react";
import { fetchIfEmpty, switchSet } from "./helpers";

const initialState = {
  status: RequestStatus.Idle,
  data: undefined,
  message: undefined,
  fetchStatus: RequestStatus.Idle,
};

interface SwipeModeProps {
  Render: RenderComponent;
  yesFunc: any;
  noFunc: any;
  fetchUrl: string;
}

const SwipeGroup = <T extends object, Extra extends object>({
  Render,
  yesFunc,
  noFunc,
  fetchUrl,
}: SwipeModeProps) => {
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
        {CardGroupSwitch<T, Extra>({
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
      <ButtonsWrapper>
        {ButtonGroupSwitch({
          displaySet,
          set1,
          setSet1,
          set2,
          setSet2,
          yesFunc,
          noFunc,
        })}
      </ButtonsWrapper>
    </>
  );
};

export default SwipeGroup;
