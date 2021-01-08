import { createContext, useContext } from "react";

export const User = createContext({
  user: null,
  loading: true,
  setUser: (arg: any) => {
    return arg;
  },
});
export const useUser = () => useContext(User);
