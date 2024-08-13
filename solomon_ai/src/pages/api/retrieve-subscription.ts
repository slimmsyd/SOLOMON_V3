import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  


  if (req.method === 'POST') {
    try {
      const { session_id } = req.body;

      // Retrieve the session from Stripe
      const session = await stripe.checkout.sessions.retrieve(session_id);

      // Retrieve the subscription ID from the session
      const subscriptionId = session.subscription;

      if (typeof subscriptionId === 'string') {
        // Fetch the subscription details from Stripe
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        // Save subscription details to your database here
        // Example: await saveSubscriptionToDatabase(subscription);

        res.status(200).json({ subscription });
      } else {
        res.status(400).json({ error: 'Subscription ID is not valid.' });
      }
    } catch (error) {
      console.error('Error retrieving subscription:', error.message);
      res.status(500).json({ error: 'Failed to retrieve subscription' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
