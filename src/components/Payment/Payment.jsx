import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(`${import.meta.env.VITE_Payment_Gateway_PK}`);

const Payment = () => {
    const location = useLocation();
    const { classData } = location.state;
    return (
    <Elements stripe={stripePromise}>
      <CheckOutForm classData={classData} />
    </Elements>
  );
};

export default Payment;
