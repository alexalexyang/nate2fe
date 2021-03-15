import { NextPage } from "next";
import styled from "styled-components";
import { useState } from "react";

const FadeInP = styled.p`
  animation: fadeIn ease 2s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

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

const Cause: NextPage = () => {
  const [cause, setCause] = useState("");

  setInterval(() => {
    setCause("");
    const randomCause = causes[Math.floor(Math.random() * causes.length)];
    setCause(randomCause);
  }, 10000);

  return cause ? <FadeInP>{cause}</FadeInP> : null;
};

export default Cause;
