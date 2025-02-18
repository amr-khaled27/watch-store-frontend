import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Lock } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/useAuth";
import { showToast } from "../utils/toast";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Signup() {
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
      confirmPassword: formData.get("confirmPassword"),
    };

    if (!data.username || !data.password || !data.confirmPassword) {
      showToast.error("All fields are required");
      return;
    }

    if ((data.username as string).length < 3) {
      showToast.error("Username must be at least 3 characters long");
      return;
    }

    if ((data.password as string).length < 6) {
      showToast.error("Password must be at least 6 characters long");
      return;
    }

    if (data.password !== data.confirmPassword) {
      showToast.error("Passwords do not match");
      return;
    }

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          username: data.username,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        showToast.success("Signup successful");
        auth.setUser(response.data);
        auth.setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        showToast.error("Signup failed");
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen animate-fade-in bg-background text-text flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="text-center text-xl w-10 h-10 hover:bg-gray-600/50 transition-colors duration-150 flex justify-center items-center rounded-md fixed right-4 top-4"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </Link>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 relative">
            <div className="absolute inset-0 bg-accent/20 rounded-xl rotate-6"></div>
            <div className="absolute inset-0 bg-accent rounded-xl flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold">Create your account</h2>
          <p className="mt-2 text-primary">Join us and start shopping</p>
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-primary"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-background border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              <Lock className="h-5 w-5" />
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-primary">Already have an account?</span>{" "}
            <Link
              to="/auth/signin"
              className="text-accent hover:text-accent/90 font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
