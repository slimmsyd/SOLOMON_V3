
import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const buf = await buffer(req); // Get raw body
      const sig = req.headers['stripe-signature'];
      let event;

      // Verify the signature
      try {
        event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET);
      } catch (err) {
        console.error(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // Handle the event
      console.log('Event:', event.type);
      return res.status(200).json({ status: 'success', event: event.type });
    } catch (error) {
      console.error('Error:', error.message);
      return res.status(500).json({ status: 'Failed', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
