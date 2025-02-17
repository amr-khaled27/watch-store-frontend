import { AlertCircle, ArrowLeft, ShoppingCart } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-background text-text">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <AlertCircle className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-primary text-lg">
            Your order has not been processed
          </p>
        </div>

        <div className="bg-background-alpha backdrop-blur-sm rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">What happened?</h2>
          <p className="text-primary mb-6">
            Your payment was cancelled and no charges were made to your account.
            This might have happened because:
          </p>
          <ul className="list-disc list-inside space-y-2 text-primary mb-8">
            <li>You chose to cancel the payment process</li>
            <li>There was an issue with your payment method</li>
            <li>The session timed out</li>
            <li>There was a technical problem</li>
          </ul>

          <h3 className="text-xl font-bold mb-4">What can you do now?</h3>
          <p className="text-primary mb-6">
            You can return to your cart and try the payment process again. If
            you continue to experience issues, please contact our support team
            for assistance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => (window.location.href = "/cart")}
              className="flex-1 bg-accent hover:bg-accent/90 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Return to Cart
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="flex-1 border border-primary/20 hover:bg-primary/5 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </button>
          </div>
        </div>

        <div className="text-center text-primary text-sm">
          <p>Need help? Contact our support team at</p>
          <a
            href="mailto:support@example.com"
            className="text-accent hover:underline"
          >
            support@example.com
          </a>
        </div>
      </div>
    </div>
  );
}
