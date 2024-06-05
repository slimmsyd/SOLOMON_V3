import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/api/lib/db";
import * as z from 'zod';

// Define a schema for input validation using Zod
const firstConversationSchema = z.object({
  userId: z.string().uuid(), // Ensure the userId is a valid UUID
});

async function getFirstConvo(userId: string) {
  console.log("User Id is being called in getFirst Convo", userId);
  console.log("Type of userId:", typeof userId);  // Log the type of userId
  console.log("Value of userId:", userId);        // Log the value of userId


  
  let conversation = await db.conversation.findFirst({
    where: {
      participants: {
        some: {
          userId: userId,
        },
      },
      firstConvo: true,
    },
    include: {
      messages: true,
    }
  });

  if (!conversation) {
    (conversation as any) = await db.conversation.create({
      data: {
        title: "Welcome!",
        firstConvo: true,
        participants: {
          create: {
            user: {
              connect: { id: userId },
            },
          },
        },
  
      },
    });
  }

  return conversation;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      try {
        const { userId } = firstConversationSchema.parse(req.body);
        console.log("Parsed userId from request:", userId); // Log the parsed userId

        const conversation = await getFirstConvo(userId);

        res.status(200).json(conversation);
      } catch (error) {
        console.error("Error handling first conversation:", error);
        res.status(500).json({ message: "Failed to handle first conversation", error: (error as Error).message });
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
