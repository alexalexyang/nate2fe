import { NextApiRequest, NextApiResponse } from "next";

import { ContentProps } from "../../types/types";

export default async function getSwipeContent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.status(200).json(placeHolder);
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
}

const placeHolder: ContentProps[] = [
  {
    id: "12345",
    originalTitle: "Hole in the wall",
    title: "Hole in the wall",
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
  {
    id: "12345",
    originalTitle: "Movie!!!",
    title: "Movie!!!",
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
  {
    id: "12345",
    originalTitle: "Boook!!!",
    title: "Booook!!!",
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
];
