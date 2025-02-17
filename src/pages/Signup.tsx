import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@/context/useAuth";

const Signup: React.FC = () => {
  const auth = useAuth();
  if (auth.isLoggedIn) {
    window.location.href = "/";
  }
  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
    console.log(data);

    if (!data.username || !data.password || !data.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if ((data.username as string).length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if ((data.password as string).length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    axios
      .post(
        "http://localhost:8000/api/auth/signup",
        {
          username: data.username,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        toast.success("Signup successful");
        console.log(response.data);

        window.location.href = "/";
      })
      .catch((error) => {
        toast.error("Signup failed");
        console.error(error);
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--background)" }}
    >
      <ToastContainer icon={false} />
      <div className="bg-accent p-8 sm:rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="text-white block text-sm font-medium mb-2">
              Username
            </label>
            <Input
              name="username"
              type="username"
              placeholder="Enter your username"
              className="w-full px-3 py-2 text-white border rounded bg-accent hover:bg-purple-800 active:bg-purple-800 duration-300"
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
              className="w-full px-3 py-2 text-white border rounded bg-accent hover:bg-purple-800 active:bg-purple-800 duration-300"
            />
          </div>
          <div className="mb-4">
            <label className="text-white block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="w-full px-3 py-2 text-white border rounded bg-accent hover:bg-purple-800 active:bg-purple-800 duration-300"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 mt-4 bg-accent text-white bg-purple-700 hover:bg-purple-800 duration-300"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
