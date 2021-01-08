import { Container } from "@material-ui/core";
import { NextPage } from "next";
import PlayLottie from "../utils/play-lottie";

let LoadingAnim = require(`../assets/loading.json`);

const Loading: NextPage = () => {
  return (
    <Container maxWidth="sm">{PlayLottie(LoadingAnim, 300, 300)}</Container>
  );
};

export default Loading;
