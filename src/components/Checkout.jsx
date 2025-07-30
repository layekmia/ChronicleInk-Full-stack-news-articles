import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Checkout({ setIsOpen, amount, duration, unit }) {
  return (
    <Elements stripe={stripePromise}>
      <div className="fixed inset-0  flex items-center justify-center bg-black/20 z-50">
        <PaymentForm
          setIsOpen={setIsOpen}
          amount={amount}
          duration={duration}
          unit={unit}
        />
      </div>
    </Elements>
  );
}
