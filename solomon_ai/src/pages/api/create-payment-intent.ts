import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { amount, userId } = req.body;

      console.log("Logging the amoutn and user Id", amount, userId)


      const amountInt = parseInt(amount, 10);
      

      console.log("Logging the amount in the backend", amountInt);

      // Create a payment intent with user metadata
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInt,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        setup_future_usage: "off_session",
        metadata: { userId }, // Include userId in metadata
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error THIS IS the error why", error.message);
      res.status(500).json({ message: "Internal Server Error " });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
