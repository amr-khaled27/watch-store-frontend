import { useAuth } from "@/context/useAuth";
import axios, { AxiosResponse } from "axios";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

export default function CartPage() {
  const auth = useAuth();
  const user = auth.user;
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    async function fetchData() {
      return axios.get(`http://localhost:8000/api/cart/${user?.id}`, {
        withCredentials: true,
      });
    }
    fetchData().then((response) => {
      console.log(response.data);
      const list: CartItem[] = [];
      response.data.map((item) => {
        item.product.quantity = item.quantity;
        list.push(item.product);
      });
      console.log(list);
      setCartItems(list);
    });
  }, [user]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 15.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <ShoppingCart className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Your Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-background-alpha backdrop-blur-sm rounded-xl p-6 shadow-lg">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-4 border-b border-primary/20 last:border-0"
                >
                  <img
                    src={`http://localhost:8000/${item.image_url}`}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-primary font-medium">
                      ${item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2 bg-background rounded-lg">
                        <button className="p-1 hover:text-accent transition-colors">
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button className="p-1 hover:text-accent transition-colors">
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <button className="text-accent hover:text-accent/80 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-lg font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-background-alpha backdrop-blur-sm rounded-xl p-6 shadow-lg sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="h-px bg-primary/20 my-2"></div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
