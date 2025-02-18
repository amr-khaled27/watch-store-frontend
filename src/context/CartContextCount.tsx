import { useState, ReactNode, useEffect } from "react";
import { CartContextCount } from "./cartContextType";
import axios from "axios";

interface CartContextCountProps {
  children: ReactNode;
}

export const CartContextCountProvider = ({
  children,
}: CartContextCountProps) => {
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:8000/api/cart/count`, {
      withCredentials: true,
    });
    return response.data.count;
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
