
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/api/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId, conversationId } = req.query;

    if (!userId || !conversationId) {
      return res.status(400).json({ message: "Both userId and conversationId are required" });
    }

    try {
      const messages = await db.messages.findMany({
        where: {
          authorId: Number(userId),
          conversationId: Number(conversationId)
        },
        orderBy: {
          createdAt: 'asc' // Assuming you want the oldest messages first
        }
      });

      res.status(200).json(messages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      res.status(500).json({ message: "Failed to fetch messages", error: (error as Error).message });

    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
