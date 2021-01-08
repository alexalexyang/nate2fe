export interface menuItem {
    title: string,
    url: string,
    auth: boolean,
  }

export const menuItems: menuItem[] = [
    {
      title: "Home",
      url: "/",
      auth: false,
    },
    {
      title: "About",
      url: "/about",
      auth: false,
    },
    {
      title: "Settings",
      url: "/settings",
      auth: true,
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
  ]