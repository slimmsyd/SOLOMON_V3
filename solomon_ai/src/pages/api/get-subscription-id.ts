import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/app/api/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId } = req.body;

      const user = await db.user.findUnique({
        where: { id: userId },
        select: { paymentIntentId: true },
      });

      if (user && user.paymentIntentId) {
        res.status(200).json({ paymentIntentId: user.paymentIntentId });
      } else {
        res.status(404).json({ message: 'Subscription not found' });
      }
    } catch (error) {
      console.error('Error fetching subscription ID:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
