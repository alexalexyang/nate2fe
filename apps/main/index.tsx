import {
  Banner,
  Button,
  ButtonsWrapper,
  Content,
  MainWrapper,
  SingleButton,
} from "./styles";

import { NextPage } from "next";

const Main: NextPage = () => {
  return (
    <MainWrapper>
      <Content></Content>
      <ButtonsWrapper>
        <SingleButton>
          <Button>No</Button>
        </SingleButton>
        <SingleButton>
          <Button>Yes</Button>
        </SingleButton>
      </ButtonsWrapper>
      <Banner>End the coup.</Banner>
    </MainWrapper>
  );
};

export default Main;
