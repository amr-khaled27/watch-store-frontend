import { useAuth } from "@/context/useAuth";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";
import { PuffLoader } from "react-spinners";
import { Lock } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

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

  const navigate = useNavigate();

  const auth = useAuth();
  const user = auth.user;

  useEffect(() => {
    async function fetchData() {
      return axios.get(`http://localhost:8000/api/cart`, {
        withCredentials: true,
      });
    }
    fetchData()
      .then((response) => {
        const list: CartItem[] = [];
        response.data.map((item) => {
          item.product.quantity = item.quantity;
          list.push(item.product);
        });
        setCartEmpty(cartItems.length === 0);
        setLoading(false);
        setCartItems(list);
      })
      .catch(() => {
        navigate("/auth/signin");
      });
  }, [auth.isLoggedIn, cartItems.length, navigate]);

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

  const makePayment = async () => {
    if (total === 0) navigate("/");
    else {
      try {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

        const response = await axios.post(
          "http://localhost:8000/api/checkout",
          {
            cartItems: cartItems,
          },
          { withCredentials: true }
        );

        await axios.delete("http://localhost:8000/api/cart", {
          withCredentials: true,
        });

        await stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        });
      } catch (error) {
        console.error(error);
      }
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Your Cart</h1>
          </div>

          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="w-10 h-10 hover:bg-gray-600/50"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </Button>
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
                </div>
              ) : (
                <>
                  <div>
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onIncrease={() => handleIncrement(item.id)}
                        onDecrease={() => handleDecrement(item.id)}
                        onRemove={() => handleRemove(item.id)}
                      />
                    ))}
                  </div>

                  <button
                    onClick={async () => {
                      try {
                        await axios.delete("http://localhost:8000/api/cart", {
                          withCredentials: true,
                        });
                        setCartItems([]);
                        setCartEmpty(true);
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                    className="mt-2 inline-block text-center bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Clear Cart
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-background rounded-xl p-6 shadow-lg sticky top-4">
              {total > 0 && (
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              )}

              <div className="space-y-2 mb-4">
                {total > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-medium">
                        ${shipping.toFixed(2)}
                      </span>
                    </div>
                    <div className="h-px bg-primary/20 my-2"></div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>

              <div>
                <button
                  onClick={makePayment}
                  className="w-full inline-block text-center bg-accent hover:bg-accent/90 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  {total === 0 ? (
                    "Continue Shopping"
                  ) : (
                    <span>Pay ${total.toFixed(2)}</span>
                  )}
                </button>

                {total > 0 && (
                  <div className="text-sm mt-2 text-gray-400 flex items-center justify-center gap-1">
                    <Lock className="w-4 h-4" />
                    <span>Secure checkout powered by Stripe</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
