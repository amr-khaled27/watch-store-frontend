import React from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

const NavHeader: React.FC = () => {
  return (
    <header className="font-inter flex justify-between items-center shadow-2xl sticky top-0 p-4 bg-background z-50">
      <h1 className="text-xl font-bold">Chronos</h1>
      <div className="flex items-center space-x-4 text-white">
        <Button className="px-4 py-2 bg-accent">Sign In</Button>
        <Button className="px-4 py-2 bg-accent">Sign Up</Button>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default NavHeader;
