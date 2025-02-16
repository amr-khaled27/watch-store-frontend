import { useEffect, useState } from "react";
import { CreditCard, Lock, Package, ShoppingBag } from "lucide-react";
import { CartItem } from "@/pages/Cart";
import { useAuth } from "@/context/useAuth";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

type userData = {
  firstname: string;
  lastname: string;
  email: string;
  streetaddress: string;
  city: string;
  state: string;
  zip: string;
};

export default function Checkout() {
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userData, setUserData] = useState<userData | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [cartEmpty, setCartEmpty] = useState<boolean>(false);

  const auth = useAuth();
  const user = auth.user;

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
      const list: CartItem[] = [];
      response.data.map((item) => {
        item.product.quantity = item.quantity;
        list.push(item.product);
      });
      setLoading(false);
      setCartItems(list);
      setCartEmpty(cartItems.length === 0);
    });
  }, [user, cartItems.length]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (
      !data.firstname ||
      !data.lastname ||
      !data.email ||
      !data.streetaddress ||
      !data.city ||
      !data.state ||
      !data.zip
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@(gmail\.com|yahoo\.com|outlook\.com)$/;
    if (!emailRegex.test(data.email as string)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (
      !nameRegex.test(data.firstname as string) ||
      !nameRegex.test(data.lastname as string)
    ) {
      toast.error("First name and last name should contain only letters");
      return;
    }

    if (!/^\d{5}$/.test(data.zip as string)) {
      toast.error("ZIP code should be exactly 5 digits");
      return;
    }

    setUserData(data as userData);

    setStep("payment");
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 15.99 : 0;
  const tax = subtotal > 0 ? subtotal * 0.08 : 0;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background text-text">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Lock className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Secure Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "shipping"
                    ? "bg-accent text-white"
                    : "bg-primary text-white"
                }`}
              >
                <Package className="w-5 h-5" />
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div className="w-24 h-1 bg-primary/20"></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "payment"
                    ? "bg-accent text-white"
                    : "bg-primary/20 text-primary"
                }`}
              >
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-background-alpha backdrop-blur-sm rounded-xl p-6 shadow-lg">
              {step === "shipping" ? (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">
                    Shipping Information
                  </h2>

                  <form onSubmit={handleContinue} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          First Name
                        </label>
                        <input
                          name="firstname"
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-accent/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastname"
                          className="w-full px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-accent/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="streetaddress"
                        className="w-full px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          City
                        </label>
                        <input
                          name="city"
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-accent/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          State
                        </label>
                        <input
                          name="state"
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-accent/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="zip"
                          maxLength={5}
                          className="w-full px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-accent/50"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">
                    Payment Information
                  </h2>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-accent/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="saveCard"
                      className="rounded border-primary/20"
                    />
                    <label htmlFor="saveCard" className="text-sm">
                      Save card for future purchases
                    </label>
                  </div>

                  <button className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                    Place Order
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-background-alpha backdrop-blur-sm rounded-xl p-6 shadow-lg sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Order Summary</h2>
              </div>

              <div className="space-y-4 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={`http://localhost:8000/${item.image_url}`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-primary">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-primary/20 my-2"></div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-sm text-primary flex items-center gap-1">
                <Lock className="w-4 h-4" />
                <span>Secure checkout powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
