import React from "react";
import axios from "axios";

const Logout: React.FC = () => {
  const handleLogout = async () => {
    console.log("logging out");
    const response = await axios.post(
      "http://localhost:8000/api/logout",
      {},
      { withCredentials: true }
    );
    console.log(response.data);
    if (response.status === 200) {
      window.location.reload();
    }
  };

  return (
    <button className="p-2 rounded bg-accent text-white" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
