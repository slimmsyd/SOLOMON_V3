import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      try {
        const { subscriptionID } = req.body;
  
        if (!subscriptionID) {
          return res.status(400).json({ error: 'Subscription ID is required' });
        }
  
        console.log("Renewing subscription for ID:", subscriptionID);
  
        const session = await stripe.subscriptions.update(subscriptionID, {
          cancel_at_period_end: false,
        });
  
        res.status(200).json({
          subscriptionId: session.id,
          status: session.status,
          cancel_at_period_end: session.cancel_at_period_end,
          canceled_at: session.canceled_at,
        });
      } catch (error) {
        console.error("Error renewing subscription:", error);
        res.status(500).json({ error: "Failed to renew subscription" });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }