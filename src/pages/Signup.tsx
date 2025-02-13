import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";

const Signup: React.FC = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--background)" }}
    >
      <div className="bg-accent p-8 sm:rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-6">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label className="text-white block text-sm font-medium mb-2">
              Username
            </label>
            <Input
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
