// Import necessary libraries and middleware
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { db } from "@/app/api/lib/db";


const userSchema = z.object({
    userId: z.string().uuid(),
    subscriptionId: z.string()
})



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, subscriptionId } = userSchema.parse(
        req.body
      );


      console.log("Just logging the update thing here")

    console.log("Logging the UserID In The Backend", userId)



    if (!userId || !subscriptionId) {
      return res.status(400).json({ error: 'Missing userId or subscriptionId' });
    }

    try {
      const updatedUser = await db.user.update({
        where: { id: userId },
        data: { paymentIntentId: subscriptionId },
      });
      
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      console.error('Error updating user subscription:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
