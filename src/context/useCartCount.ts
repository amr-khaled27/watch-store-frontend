import { useContext } from "react";
import { CartContextCount } from "./cartContextType";

export const useCartContextCount = () => {
  const context = useContext(CartContextCount);
  if (context === undefined) {
    throw new Error(
      "useCartContextCount must be used within a CartContextCountProvider"
    );
  }
  return context;
};
