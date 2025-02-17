import { createContext } from "react";
import { User } from "./AuthContext";

interface AuthContextType {
  isLoggedIn: boolean;
  checkAuth: () => void;
  loading: boolean;
  user: User | null;
  setUser: (user: User) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
