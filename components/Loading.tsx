import { NextPage } from "next";
import PlayLottie from "../utils/play-lottie";
import styled from "styled-components";

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

let LoadingAnim = require(`../assets/loading.json`);

const Loading: NextPage = () => {
  return (
    <Center>
      {PlayLottie(LoadingAnim, 300, 300)}
      <h2>{`This is you. This is how you wait.`}</h2>
    </Center>
  );
};

export default Loading;
