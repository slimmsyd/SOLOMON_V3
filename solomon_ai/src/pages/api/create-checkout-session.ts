import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId, email, priceId, subscription } = req.body;

      console.log("Logging the PriceID", priceId)
      console.log("Logging the subscpriotn shit", subscription)

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: "price_1PwCXoLLJdDUyWvS4cmqkCK3", quantity: 1 }],
        metadata: { userId, email, subscription },
        mode: 'subscription',
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        allow_promotion_codes: false,
      });

      res.status(200).json({ sessionId: session.id, subscriptionId: session.subscription });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}