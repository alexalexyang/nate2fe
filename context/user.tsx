import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface UserProps {
  auth: any;
  groups?: any;
  loading: boolean;
}
interface UserContextProps {
  user: UserProps | null;
  setUser: Dispatch<SetStateAction<UserProps>>;
}

export const User = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(User);
