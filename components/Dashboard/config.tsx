export interface item {
  app: string;
  url: string;
  description: string;
  auth: boolean;
}

export const items: item[] = [
  {
    app: "Vi",
    url: "/vi",
    description: "A service that reminds you to check in on your friends.",
    auth: true,
  },
  {
    app: "Boba",
    url: "/boba",
    description: "A service that helps you to help your friend find a job.",
    auth: true,
  },
  {
    app: "Nomurica",
    url: "/nomurica",
    description:
      "A service that surfaces films from outside hegemonic countries.",
    auth: false,
  },
  {
    app: "Character-limit",
    url: "/character-limit",
    description:
      "Idk. I just really wanted something that counts characters with a little visual aid for myself.",
    auth: false,
  },
];
