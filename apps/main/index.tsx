import { Body, MainWrapper } from "./styles";
import { noFunc, yesFunc } from "./helpers";

import Cause from "./cause";
import Content from "./content";
import { NextPage } from "next";
import SwipeGroup from "./SwipeGroup";

const Main: NextPage = () => {
  return (
    <MainWrapper>
      <Body>
        <SwipeGroup
          Render={Content as any}
          noFunc={noFunc}
          yesFunc={yesFunc}
          fetchUrl={`/api/content/get-content`}
        />
      </Body>
      <Cause />
    </MainWrapper>
  );
};

export default Main;
