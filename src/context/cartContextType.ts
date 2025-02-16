import { createContext } from "react";

type CartContextCountType = {
  count: number;
  setCount: (count: number) => void;
  increment: () => void;
  decrement: () => void;
};

export const CartContextCount = createContext<CartContextCountType | undefined>(
  undefined
);
