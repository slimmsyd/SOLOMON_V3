import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { subscriptionID } = req.body;

      console.log("LOggin the SusbcriptionID in the Body",subscriptionID)

      if (!subscriptionID) {
        return res.status(400).json({ error: 'Subscription ID is required' });
      }

      console.log("Retrieving subscription details for ID:", subscriptionID);

      const updatedSubscription = await stripe.subscriptions.retrieve(subscriptionID);

      res.status(200).json({
        subscriptionId: updatedSubscription.id,
        status: updatedSubscription.status,
        cancel_at_period_end: updatedSubscription.cancel_at_period_end,
        canceled_at: updatedSubscription.canceled_at,
      });
    } catch (error) {
      console.error("Error retrieving subscription details:", error);
      res.status(500).json({ error: "Failed to retrieve subscription details" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
