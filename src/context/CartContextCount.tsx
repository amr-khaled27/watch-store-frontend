import { useState, ReactNode, useEffect } from "react";
import { CartContextCount } from "./cartContextType";
import axios from "axios";

interface CartContextCountProps {
  children: ReactNode;
}

interface CartContextCountType {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const CartContextCountProvider = ({
  children,
}: CartContextCountProps) => {
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:8000/api/cart`, {
      withCredentials: true,
    });
    return response.data.length;
  };

  useEffect(() => {
    const fetchAndSetCount = async () => {
      setCount(await fetchData());
    };
    fetchAndSetCount();
  }, []);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <CartContextCount.Provider
      value={{ count, setCount, increment, decrement }}
    >
      {children}
    </CartContextCount.Provider>
  );
};
