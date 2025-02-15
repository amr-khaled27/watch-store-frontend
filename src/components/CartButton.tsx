import React from "react";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

interface CartButtonProps {
  itemCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount }) => {
  return (
    <Button
      onClick={() => {
        window.location.href = "/cart";
      }}
      variant="ghost"
      className="relative hover:bg-gray-600 w-10 h-10 hover:bg-gray-600/20"
    >
      {itemCount !== 0 ? (
        <span className="absolute top-0 right-0 bg-accent text-white rounded-full w-5 h-5 flex justify-center items-center">
          {itemCount}
        </span>
      ) : null}
      <FontAwesomeIcon icon={faCartShopping} />
    </Button>
  );
};

export default CartButton;
