import { ButtonGroupSwitch, CardGroupSwitch } from "./content-components";
import { ButtonsWrapper, StyledContent } from "../styles";
import {
  ContentRequest,
  RenderComponent,
  RequestStatus,
} from "../../../types/types";
import React, { useEffect, useState } from "react";
import {
  fetchIfEmpty,
  switchSet,
} from "../../../components/SwipeGroup/helpers";

import Loading from "../../../components/Loading";

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

const SwipeGroup = <T extends object>({
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

  if (
    set1.status !== RequestStatus.Success &&
    set2.status !== RequestStatus.Success
  )
    return <Loading />;

  return (
    <>
      <StyledContent>
        <CardGroupSwitch
          displaySet={displaySet}
          set1={set1}
          setSet1={setSet1}
          set2={set2}
          setSet2={setSet2}
          Render={Render}
          yesFunc={yesFunc}
          noFunc={noFunc}
        />
      </StyledContent>
      <ButtonsWrapper>
        <ButtonGroupSwitch
          displaySet={displaySet}
          set1={set1}
          setSet1={setSet1}
          set2={set2}
          setSet2={setSet2}
          yesFunc={yesFunc}
          noFunc={noFunc}
        />
      </ButtonsWrapper>
    </>
  );
};

export default SwipeGroup;
