export interface menuItem {
  title: string;
  url: string;
  auth: boolean;
}

export const menuItems: menuItem[] = [
  // {
  //   title: "Home",
  //   url: "/",
  //   auth: false,
  // },
  // {
  //   title: "Manifesto",
  //   url: "/manifesto",
  //   auth: false,
  // },
  {
    title: "Nomurica",
    url: "/nomurica",
    auth: false,
  },
  {
    title: "Swipe",
    url: "/nomurica/swipe",
    auth: false,
  },
  {
    title: "Top Movies",
    url: "/nomurica/top-movies",
    auth: false,
  },
  {
    title: "Settings",
    url: "/settings",
    auth: true,
  },
  {
    title: "About",
    url: "/about",
    auth: false,
  },
  {
    title: "Login",
    url: "/api/auth/login",
    auth: false,
  },
  {
    title: "Logout",
    url: "/api/auth/logout",
    auth: true,
  },
];
