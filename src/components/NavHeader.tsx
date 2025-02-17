import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/context/useAuth";
import Logout from "./Logout";
import CartButton from "./CartButton";
import { useCartContextCount } from "@/context/useCartCount";

const NavHeader: React.FC = () => {
  const { isLoggedIn, loading } = useAuth();
  const { count } = useCartContextCount();

  return (
    <header className="animate-fade-in font-inter flex justify-between items-center shadow-lg sticky top-0 p-4 bg-background z-50">
      <h1 className="text-xl font-bold">Chronos</h1>
      <div className="flex items-center space-x-4 text-text">
        {!loading &&
          (isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Logout />
              <CartButton itemCount={count} />
            </div>
          ) : (
            <>
              <a className="p-1" href="/auth/signin">
                Sign In
              </a>
              <a className="p-1" href="/auth/signup">
                Sign Up
              </a>
            </>
          ))}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default NavHeader;
