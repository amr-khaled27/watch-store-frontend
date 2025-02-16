import { useAuth } from "@/context/useAuth";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useCartContextCount } from "@/context/useCartCount";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
}) => {
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);
  const { increment } = useCartContextCount();
  const auth = useAuth();

  const handleAddToCart = async (id: string) => {
    if (!auth.isLoggedIn) {
      toast.error("Please sign in to add products to cart");
      return;
    }
    setAwaitingResponse(true);
    await axios.post(
      "http://localhost:8000/api/add-to-cart",
      {
        productId: id,
      },
      { withCredentials: true }
    );

    setAwaitingResponse(false);

    toast.success("Product added to cart successfully!");
  };
  return (
    <div
      key={id}
      className="bg-background shadow-xl rounded-xl outline outline-1 outline-transparent hover:outline-text transition-[outline] duration-300 overflow-hidden"
    >
      <img
        src={`http://localhost:8000/${imageUrl}`}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col justify-between h-[235px]">
        <div>
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-accent font-bold">${price.toFixed(2)}</p>
          <button
            onClick={() => {
              handleAddToCart(id);
              increment();
            }}
            className="bg-accent text-background w-[120px] px-4 py-2 rounded-md"
          >
            {awaitingResponse ? (
              <BeatLoader size={8} color="#cacaca" />
            ) : (
              "Add to cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
