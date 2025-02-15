import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/useAuth";
import { User } from "@/context/AuthContext";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const auth = useAuth();

  useEffect(() => {
    setUser(auth.user);
  }, [auth.user]);

  return (
    <div className="h-screen bg-background text-text p-4 justify-center items-center flex flex-col">
      <h1>Profile Page</h1>
      {user ? <p>Username: {user.username}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Profile;
