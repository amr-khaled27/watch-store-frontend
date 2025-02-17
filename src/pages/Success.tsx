import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center">
      <div className="text-center px-4">
        <div className="inline-block mb-4">
          <CheckCircle className="w-16 h-16 text-accent" />
        </div>
        <h1 className="text-4xl font-bold mb-6">Thank You for Your Order!</h1>
        <Link
          to="/"
          className="inline-block bg-accent hover:bg-accent/90 text-white font-medium py-3 px-8 rounded-lg transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
