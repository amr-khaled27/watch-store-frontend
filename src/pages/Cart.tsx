import { useAuth } from "@/context/useAuth";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";
import { PuffLoader } from "react-spinners";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cartEmpty, setCartEmpty] = useState<boolean>(false);

  const auth = useAuth();
  const user = auth.user;

  useEffect(() => {
    if (!user) {
      return;
    }
    async function fetchData() {
      return axios.get(`http://localhost:8000/api/cart`, {
        withCredentials: true,
      });
    }
    fetchData().then((response) => {
      const list: CartItem[] = [];
      response.data.map((item) => {
        item.product.quantity = item.quantity;
        list.push(item.product);
      });
      setCartEmpty(cartItems.length === 0);
      setLoading(false);
      setCartItems(list);
    });
  }, [user, cartItems.length]);

  const handleRemove = async (id: string) => {
    console.log(`removing item with id: ${id}`);
    try {
      await axios.delete(`http://localhost:8000/api/cart/${id}`, {
        withCredentials: true,
      });
      console.log("updating ui!");
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrement = async (id: string) => {
    console.log(
      `increasing quantity of item with id: ${id}, for user with id: ${user?.id}`
    );
    try {
      await axios.post(
        `http://localhost:8000/api/cart/increment`,
        {
          productId: id,
        },
        { withCredentials: true }
      );
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecrement = async (id: string) => {
    console.log(
      `decreasing quantity of item with id: ${id}, for user with id: ${user?.id}`
    );
    if (cartItems.some((item) => item.id === id && item.quantity === 1)) {
      console.log("use the delete button");
      return;
    }
    try {
      await axios.post(
        `http://localhost:8000/api/cart/decrement`,
        {
          productId: id,
        },
        { withCredentials: true }
      );
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal === 0 ? 0 : 15.99;
  const total = subtotal === 0 ? 0 : subtotal + shipping;

  return (
    <div className="min-h-screen animate-fade-in bg-background text-text">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <ShoppingCart className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Your Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-background-alpha backdrop-blur-sm rounded-xl p-6 shadow-lg">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <PuffLoader size={150} color="#cacaca" />
                </div>
              ) : cartEmpty ? (
                <div className="text-center py-16 space-y-4">
                  <p className="text-xl font-medium">Your cart is empty</p>
                  <a
                    href="/"
                    className="inline-block hover:bg-accent p-2 duration-300"
                  >
                    Continue Shopping?
                  </a>
                </div>
              ) : (
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={() => handleIncrement(item.id)}
                    onDecrease={() => handleDecrement(item.id)}
                    onRemove={() => handleRemove(item.id)}
                  />
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-background rounded-xl p-6 shadow-lg sticky top-4">
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

              <a
                href="/cart/checkout"
                className="w-full inline-block text-center bg-accent hover:bg-accent/90 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Proceed to Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
