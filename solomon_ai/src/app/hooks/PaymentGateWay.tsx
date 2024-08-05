"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "../chat/app/components/CheckOutPage";
import convertToSubcurrency from "@/utilis/convertToSubcurrency";
import Link from "next/link";

//Defensive programming check
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === "undefined") {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!); // the "!" is a type assertion to ensure that its avaiable or not
export default function PayementGatway() {
  //The amount that is sending to me
  const amount = 24.99;
  const convertedAmount = convertToSubcurrency(amount);


  const mockPaymentLink  = "https://buy.stripe.com/test_dR6cQb0S52nB2ti7ss"

  return (
    <div className="text-white">
      {/* <div>Sydney</div>

      <div>Is requesting this amount of bread {amount}</div> */}

      <Elements
        options={{
          mode: "subscription",
          amount: convertedAmount, //cents
          currency: "usd"

        }}
        stripe={stripePromise}
      >
        <CheckoutPage amount={amount}  />

        {/* <Link target = "_blank" href = "https://buy.stripe.com/test_dR6cQb0S52nB2ti7ss">Dummy Paymentlink </Link> */}
      </Elements>
    </div>
  );
}
