import { NextPage } from "next";
import styled from "styled-components";
import { useState } from "react";

const FadeInP = styled.p`
  animation: fadeIn ease 2s;

  a {
    color: white;
  }

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
  {
    msg: "End the military coup in Myanmar.",
    url: "https://news.un.org/en/story/2021/03/1087332",
  },
  {
    msg: "End lese majeste in Thailand.",
    url: "https://news.un.org/en/story/2021/02/1084112",
  },
  {
    msg: "Rohingya lives matter.",
    url: "https://www.unhcr.org/rohingya-emergency.html",
  },
  {
    msg: "Uyghur lives matter.",
    url:
      "https://en.wikipedia.org/wiki/Uyghurs#Persecution_of_Uyghurs_in_Xinjiang",
  },
  {
    msg: "Justice for Jamal Khashoggi.",
    url: "https://en.wikipedia.org/wiki/Jamal_Khashoggi",
  },
  {
    msg: "Liberty for Hong Kong.",
    url: "https://en.wikipedia.org/wiki/2019%E2%80%9320_Hong_Kong_protests",
  },
  {
    msg: "End abuses in West Papua",
    url: "https://en.wikipedia.org/wiki/Papua_conflict",
  },
  {
    msg: "West Papuan lives matter",
    url: "https://en.wikipedia.org/wiki/Papua_conflict",
  },
];

const Cause: NextPage = () => {
  const [cause, setCause] = useState<any | null>(
    causes[Math.floor(Math.random() * causes.length)]
  );

  setInterval(() => {
    setCause(null);
    const randomCause = causes[Math.floor(Math.random() * causes.length)];
    setCause(randomCause);
  }, 25000);

  return cause ? (
    <FadeInP>
      <a href={cause.url ? cause.url : "#"} target="__blank">
        {cause.msg}
      </a>
    </FadeInP>
  ) : null;
};

export default Cause;
