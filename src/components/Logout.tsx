import React from "react";
import axios from "axios";
import { useAuth } from "@/context/useAuth";

const Logout: React.FC = () => {
  const auth = useAuth();
  const handleLogout = async () => {
    console.log("logging out");
    const response = await axios.post(
      "http://localhost:8000/api/logout",
      {},
      { withCredentials: true }
    );
    console.log(response.data);
    if (response.status === 200) {
      auth.setIsLoggedIn(false);
      auth.setUser(null);
    }
  };

  return (
    <button className="p-2 rounded bg-accent text-white" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
