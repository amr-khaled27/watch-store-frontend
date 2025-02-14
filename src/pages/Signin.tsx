import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "react-toastify";

const Signin: React.FC = () => {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    console.log(data);

    if (!data.username || !data.password) {
      toast.error("All fields are required");
      return;
    }

    if ((data.username as string).length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    if ((data.password as string).length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    axios
      .post(
        "http://localhost:8000/api/auth/login",
        {
          username: data.username,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        toast.success("Login successful");
        console.log(response.data);

        window.location.href = "/";
      })
      .catch((error) => {
        toast.error("Login failed");
        console.error(error);
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--background)" }}
    >
      <div className="bg-accent p-8 sm:rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-6">Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-white block text-sm font-medium mb-2">
              Username
            </label>
            <Input
              name="username"
              type="username"
              placeholder="Enter your username"
              className="w-full px-3 py-2 border text-white rounded bg-accent hover:bg-purple-800 active:bg-purple-800 duration-300"
            />
          </div>
          <div className="mb-4">
            <label className="text-white block text-sm font-medium mb-2">
              Password
            </label>
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border text-white rounded bg-accent hover:bg-purple-800 active:bg-purple-800 duration-300"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 mt-4 bg-accent bg-purple-700 hover:bg-purple-800 duration-300"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
