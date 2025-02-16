import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./authContextType";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface User {
  id: string;
  username: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = async () => {
    try {
      console.log(
        "Checking user authentication using authcontect component..."
      );
      const response = await axios.get("http://localhost:8000/api/fetch/user", {
        withCredentials: true,
      });
      setIsLoggedIn(true);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error checking user authentication:", error);
      setIsLoggedIn(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, checkAuth, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};
