import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { subscriptionID } = req.body;



      console.log("Just logging the SUbscription within the Body", subscriptionID)


      const session = await stripe.subscriptions.update(subscriptionID, {
        cancel_at_period_end: true,
      });

      // Retrieve the updated subscription status
      const updatedSubscription = await stripe.subscriptions.retrieve(subscriptionID);

      res.status(200).json({
        subscriptionId: updatedSubscription.id,
        status: updatedSubscription.status,
        cancel_at_period_end: updatedSubscription.cancel_at_period_end,
        canceled_at: updatedSubscription.canceled_at,
      });

    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
