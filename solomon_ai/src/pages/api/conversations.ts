import { NextApiRequest, NextApiResponse } from "next";
import * as z from 'zod';
import { db } from "@/app/api/lib/db";

// Schema for input validation using Zod
const conversationSchema = z.object({
  userIds: z.array(z.number()),  // Expecting an array of user IDs to add as participants
  title: z.string(),  // Assuming title is now required
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      try {
        const { userIds, title } = conversationSchema.parse(req.body);

        const newConversation = await db.conversation.create({
          data: {
            title: title || "New Chat",
            participants: {
              create: userIds.map(userId => ({
                user: { connect: { id: userId } }
              }))
            },
          },
          include: {
            participants: {
              include: { user: true }
            }
          }
        });

        console.log(`New conversation created with ID: ${newConversation.id}`);
        res.status(201).json(newConversation);
      } catch (error) {
        console.error("Error creating conversation:", error);
        res.status(500).json({ message: "Failed to create conversation", error: (error as Error).message });
      }
      break;

    case 'GET':
      try {
        const { id } = req.query;  // Assuming `id` is passed as a query parameter
        const conversation = await db.conversation.findUnique({
          where: { id: parseInt(id as string) },
          include: {
            participants: {
              include: {
                user: true
              }
            }
          }
        });

        if (!conversation) {
          return res.status(404).json({ message: "Conversation not found" });
        }

        res.status(200).json(conversation);
      } catch (error: unknown) {
        // Check if error is an instance of Error and has a 'code' property
        if (error instanceof Error && 'code' in error) {
          if (error.code === 'P2025') {
            res.status(404).json({ message: "No such conversation found" });
          } else {
            res.status(500).json({ message: "Failed to delete conversation", error: error.message });
          }
        } else {
          // If error is not an instance of Error or lacks 'code', return a generic server error
          res.status(500).json({ message: "Failed to delete conversation", error: "An unexpected error occurred" });
        }
      }
      
      break;


      case 'DELETE':
        try {
          const { id } = req.query;
          // Delete the conversation and related data (messages, participants)
          await db.conversation.delete({
            where: { id: parseInt(id as string) }
          });
          res.status(204).json({ message: "Conversation deleted successfully" });
        } catch (error: unknown) {
          // Check if error is an instance of Error and has a 'code' property
          if (error instanceof Error && 'code' in error) {
            if (error.code === 'P2025') {
              res.status(404).json({ message: "No such conversation found" });
            } else {
              res.status(500).json({ message: "Failed to delete conversation", error: error.message });
            }
          } else {
            // If error is not an instance of Error or lacks 'code', return a generic server error
            res.status(500).json({ message: "Failed to delete conversation", error: "An unexpected error occurred" });
          }
        }
        
        break;
  


    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
