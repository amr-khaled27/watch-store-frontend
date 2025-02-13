import React from "react";
import { ThemeToggle } from "./theme-toggle";

const NavHeader: React.FC = () => {
  return (
    <header className="font-inter flex justify-between items-center shadow-lg sticky top-0 p-4 bg-background z-50">
      <h1 className="text-xl font-bold">Chronos</h1>
      <div className="flex items-center space-x-4 text-text">
        <a className="p-1" href="/auth/signin">
          Sign In
        </a>
        <a className="p-1" href="/auth/signup">
          Sign Up
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default NavHeader;
