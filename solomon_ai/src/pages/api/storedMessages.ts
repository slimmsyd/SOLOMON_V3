
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/api/lib/db";
import * as z from 'zod';

const userIdSchema = z.object({
  authorId: z.string().uuid(), // Ensure the userId is a valid UUID
  conversationId: z.string().uuid(), // Ensure the userId is a valid UUID
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {

    try {

      const { authorId, conversationId } = userIdSchema.parse(req.query);

      console.log("Logging the author Id in stored Message", authorId)
      console.log("Logging the convo Id in stored Message", conversationId)

      if (!authorId || !conversationId) {
        return res.status(400).json({ message: "Both userId and conversationId are required" });
      }
      const messages = await db.messages.findMany({
        where: {
          authorId: authorId,
          conversationId: conversationId
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
