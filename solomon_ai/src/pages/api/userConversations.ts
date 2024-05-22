// pages/api/userConversations.js

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/api/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userId = parseInt(req.query.userId as string);

    try {
      // Fetch all conversations associated with the user
      const userConversations = await db.userConversations.findMany({
        where: { userId },
        include: {
          conversation: true  // Include the associated Conversation details
        }
      });

      // Prepare data to send back, including titles
      const conversations = userConversations
      .filter(uc => uc.conversation !== null)  // Filter out null conversations
      .map(uc => ({
        conversationId: uc.conversationId,
        title: uc.conversation.title
      }));

      res.status(200).json(conversations);
    } catch (error) {
      console.error("Failed to fetch user conversations:", error);
      res.status(500).json({ message: "Failed to fetch user conversations", error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end('Method Not Allowed');
  }
}
