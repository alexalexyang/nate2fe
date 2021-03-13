import { Banner } from "./styles";
import { NextPage } from "next";

const getCause = () => {
  const causes = [
    "End the coup in Myanmar.",
    "End lese majeste in Thailand.",
    "Rohingya lives matter.",
    "Uyghur lives matter.",
    "Justice for Khashoggi.",
    "Democracy for Hong Kong.",
  ];

  return causes[Math.floor(Math.random() * causes.length)];
};

const Cause: NextPage = () => {
  return <Banner>{getCause()}</Banner>;
};

export default Cause;
