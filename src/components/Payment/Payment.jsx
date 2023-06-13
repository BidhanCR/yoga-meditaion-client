import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(`${import.meta.env.VITE_Payment_Gateway_PK}`);

const Payment = () => {
    const location = useLocation();
    const { classData } = location.state;
    return (
    <Elements stripe={stripePromise}>
      <Helmet>
        <title>Inner Pease | Payment</title>
      </Helmet>
      <CheckOutForm classData={classData} />
    </Elements>
  );
};

export default Payment;
