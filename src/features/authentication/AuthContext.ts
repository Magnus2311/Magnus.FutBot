import { createContext } from "react";

export interface User {
  username: string | undefined;
  email: string | undefined;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<UserContextType>({
  user: { username: undefined, email: undefined },
  setUser: (user: User) => {},
});
