import { createContext } from "react";

export interface User {
  username: string | undefined;
  email: string | undefined;
}

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<UserState>({
  user: { username: undefined, email: undefined },
  setUser: () => {},
});
