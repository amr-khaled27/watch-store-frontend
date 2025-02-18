import NavHeader from "@/components/NavHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import Product from "@/components/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

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
          `${import.meta.env.VITE_API_URL}/api/fetch/products`,
          {
            headers: {
              Authorization: `Bearer 75e8cd5b-c49a-47e0-9bde-9f9b8ee15ec2`,
            },
          }
        );
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
      <div className="animate-fade-in bg-background relative items-center justify-center h-[calc(100vh-72px)] classn">
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
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image_url}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
