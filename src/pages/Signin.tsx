import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Lock } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@/context/useAuth";

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.isLoggedIn) {
    navigate("/");
    return null;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

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
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
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
        auth.setUser(response.data);
        auth.setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Login failed");
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen animate-fade-in bg-background text-text flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 relative">
            <div className="absolute inset-0 bg-accent/20 rounded-xl rotate-6"></div>
            <div className="absolute inset-0 bg-accent rounded-xl flex items-center justify-center">
              <LogIn className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-primary">Sign in to your account</p>
        </div>

        <div className="bg-background-alpha backdrop-blur-sm rounded-xl p-8 shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-primary"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-background border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-primary"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-background border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              <Lock className="h-5 w-5" />
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-primary">Don't have an account?</span>{" "}
            <Link
              to="/auth/signup"
              className="text-accent hover:text-accent/90 font-medium"
            >
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
