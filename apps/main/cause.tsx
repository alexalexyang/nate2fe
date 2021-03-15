import { Banner } from "./styles";
import { NextPage } from "next";

const getCause = () => {
  const causes = [
    "End the military coup in Myanmar.",
    "Pyit Taing Htaung",
    "End lese majeste in Thailand.",
    "Rohingya lives matter.",
    "Uyghur lives matter.",
    "Justice for Khashoggi.",
    "Liberty for Hong Kong.",
    "End abuses in West Papua",
  ];

  return causes[Math.floor(Math.random() * causes.length)];
};

const Cause: NextPage = () => {
  return <Banner>{getCause()}</Banner>;
};

export default Cause;
