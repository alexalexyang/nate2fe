import { Body, MainWrapper } from "./styles";
import { useEffect, useState } from "react";

import Cause from "./cause";
import Content from "./content";
import { ContentProps } from "../../types/types";
import { NextPage } from "next";

const Main: NextPage = () => {
  const touchScreen = navigator.maxTouchPoints > 0;

  const [items, setItems] = useState<ContentProps[]>([]);

  useEffect(() => {
    return setItems([...items, ...placeHolder]);
  }, []);

  return (
    <MainWrapper>
      <Body>
        <Content items={items} touchScreen={touchScreen} />
      </Body>
      <Cause />
    </MainWrapper>
  );
};

export default Main;

const placeHolder: ContentProps[] = [
  {
    id: "12345",
    originalTitle: "What a great title",
    title: "What a GREAT title",
    releaseDate: "2021-08-23",
    productionCountries: ["Moldova", "Ghana"],
    languages: ["English", "Hindi"],
    images: ["https://example.com", "https://example.com"],
    trailers: [
      { url: "https://example.com", type: "vimeo" },
      { url: "https://example.com", type: "youtube" },
    ],
    synopsis: "What a great movie and book this is. Amazeballs!",
    likes: 400,
    authors: ["Molly Madness", "Liao Zai", "Giorgi Urushadze"],
    editOn: [{ org: "TMDB", url: "https://etc" }],
  },
  // {
  //   id: "12345",
  //   originalTitle: "Movie!!!",
  //   title: "What a GREAT title",
  //   releaseDate: "2021-08-23",
  //   productionCountries: ["Moldova", "Ghana"],
  //   languages: ["English", "Hindi"],
  //   images: ["https://example.com", "https://example.com"],
  //   trailers: [
  //     { url: "https://example.com", type: "vimeo" },
  //     { url: "https://example.com", type: "youtube" },
  //   ],
  //   synopsis: "What a great movie and book this is. Amazeballs!",
  //   likes: 400,
  //   authors: ["Molly Madness", "Liao Zai", "Giorgi Urushadze"],
  //   editOn: [{ org: "TMDB", url: "https://etc" }],
  // },
  // {
  //   id: "12345",
  //   originalTitle: "Boook!!!",
  //   title: "What a GREAT title",
  //   releaseDate: "2021-08-23",
  //   productionCountries: ["Moldova", "Ghana"],
  //   languages: ["English", "Hindi"],
  //   images: ["https://example.com", "https://example.com"],
  //   trailers: [
  //     { url: "https://example.com", type: "vimeo" },
  //     { url: "https://example.com", type: "youtube" },
  //   ],
  //   synopsis: "What a great movie and book this is. Amazeballs!",
  //   likes: 400,
  //   authors: ["Molly Madness", "Liao Zai", "Giorgi Urushadze"],
  //   editOn: [{ org: "TMDB", url: "https://etc" }],
  // },
];
