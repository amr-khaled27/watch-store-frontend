import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let response: { data: { username: string } };

        try {
          response = await axios.get("http://localhost:8000/api/fetch/user", {
            withCredentials: true,
          });
        } catch (error) {
          console.error(
            "Error fetching user data, trying to refresh token:",
            error
          );
          await axios.get("http://localhost:8000/api/refresh", {
            withCredentials: true,
          });
          response = await axios.get("http://localhost:8000/api/fetch/user", {
            withCredentials: true,
          });
        }
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="h-screen bg-background text-text p-4 justify-center items-center flex flex-col">
      <h1>Profile Page</h1>
      {username ? <p>Username: {username}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Profile;
