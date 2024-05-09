// pages/api/conversations/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/app/api/lib/db';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Extract the id from the query parameters
  const conversationId = parseInt(id as string, 10);

  if (!conversationId) {
    res.status(400).json({ message: "Invalid conversation ID" });
    return;
  }

  switch (req.method) {
    case 'GET':
      try {
        const conversation = await db.conversation.findUnique({
          where: { id: conversationId },
          include: {
            messages: true, // Include messages if part of the conversation
            participants: {
              include: {
                user: true, // Include user details of each participant
              }
            }
          }
        });
        if (conversation) {
          res.json(conversation);
        } else {
          res.status(404).json({ message: "Conversation not found" });
        }
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch conversation", error });
      }
      break;
    case 'PUT':
      try {
        const { title } = req.body;
        const updatedConversation = await db.conversation.update({
          where: { id: conversationId },
          data: { title },
        });
        res.json(updatedConversation);
      } catch (error) {
        res.status(500).json({ message: "Failed to update conversation", error });
      }
      break;

      case 'DELETE':
        try {
          // First, delete all messages associated with the conversation
          await db.messages.deleteMany({
            where: { conversationId: parseInt(id as string) }
          });
  
          // Then, delete the conversation itself
          const deleteConversation = await db.conversation.delete({
            where: { id: parseInt(id as string) },
          });
  
          res.status(200).json({ message: "Conversation and related messages deleted successfully" });
        } catch (error) {
          console.error("Error deleting conversation:", error);
          res.status(500).json({ message: "Failed to delete conversation", error: (error as Error).message });
        }
        break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}




