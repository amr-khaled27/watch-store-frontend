import React from "react";
import axios from "axios";
import { useAuth } from "@/context/useAuth";
import { showToast } from "@/utils/toast";
import { useCartContextCount } from "@/context/useCartCount";

const Logout: React.FC = () => {
  const auth = useAuth();
  const { setCount } = useCartContextCount();
  const handleLogout = async () => {
    console.log("logging out");
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/logout`,
      {},
      { withCredentials: true }
    );
    console.log(response.data);
    if (response.status === 200) {
      showToast.success("Logout successful");
      setCount(0);
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
