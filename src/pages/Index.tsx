import NavHeader from "@/components/NavHeader";
import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  image_url: string;
  description: string;
  price: number;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    console.log("Index page mounted");

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/fetch/products",
          {
            headers: {
              Authorization: `Bearer 75e8cd5b-c49a-47e0-9bde-9f9b8ee15ec2`,
            },
          }
        );

        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <NavHeader />
      <div className="animate-fade-in relative items-center justify-center h-[calc(100vh-72px)] classn">
        <div className="bg-accent h-1/2"></div>
        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 font-pattya -translate-y-1/2 text-8xl font-extrabold text-center text-balance">
          <span className="text-background">Timeless</span>
          <br />
          <span className="text-accent">Elegance</span>
        </h2>
      </div>

      <div className="min-h-screen bg-background font-inter space-y-24">
        <h3 className="text-center text-3xl text-text text-balance font-semibold">
          Browse our exquisite collection
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-background shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={`http://localhost:8000/${product.image_url}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between h-[225px]">
                <div>
                  <h4 className="text-lg font-semibold">{product.name}</h4>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-accent font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                  <button className="bg-accent text-background px-4 py-2 rounded-md">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
