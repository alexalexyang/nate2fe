export interface menuItem {
  title: string;
  url: string;
  auth: boolean;
}

export const menuItems: menuItem[] = [
  {
    title: "Login",
    url: "/api/auth/login",
    auth: false,
  },
  {
    title: "Main",
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
    title: "Logout",
    url: "/api/auth/logout",
    auth: true,
  },
];
