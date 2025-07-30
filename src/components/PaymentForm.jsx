import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAuth from "../hook/useAuth";
import axiosInstance from "../utils/axiosInstance";

export default function PaymentForm({ setIsOpen, amount, duration, unit }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe is not loaded. Please try again.");
      return;
    }

    setLoading(true);
    setError("");

    const card = elements.getElement(CardElement);

    try {
      const { error: paymentError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });

      if (paymentError) {
        setError(paymentError.message);
        return;
      }

      // 2. Create payment intent from backend
      const { data } = await axiosInstance.post("/users/subscription", {
        amount,
      });
      const clientSecret = data.clientSecret;

      // 3. Confirm the payment
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: user.name.split(" ").join("").toLowerCase(),
              email: user.email,
            },
          },
        });

      if (confirmError) {
        setError(confirmError.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        await axiosInstance.patch("/users/premium", { duration, unit });
        setIsOpen(false);
        window.location.href = "/all-articles";
      }
    } catch (err) {
      setError("An unexpected error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center p-5">
      <div className="w-full max-w-sm bg-white  rounded-xl shadow-xl mt-10 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border p-3 rounded-md bg-white  shadow-inner">
            <CardElement className="p-2" />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!stripe || !elements || loading}
              className={`inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all ${
                (!stripe || !elements || loading) &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? "Processing..." : `Pay $${amount}`}
            </button>
          </div>

          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
