import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/context/useAuth";
import Logout from "./Logout";
import CartButton from "./CartButton";
import { useCartContextCount } from "@/context/useCartCount";
import { Link, useNavigate } from "react-router-dom";

const NavHeader: React.FC = () => {
  const { isLoggedIn, loading } = useAuth();
  const { count } = useCartContextCount();
  const navigate = useNavigate();

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
              <Link className="p-1" to="/auth/signin">
                Sign In
              </Link>
              <Link className="p-1" to="/auth/signup">
                Sign Up
              </Link>
            </>
          ))}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default NavHeader;
