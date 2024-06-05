// Import necessary libraries and middleware
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/api/lib/db";

import * as z from 'zod';

const userIdSchema = z.object({
  userId: z.string().uuid(), // Ensure the userId is a valid UUID
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'GET') {
    try {

      const { userId } = userIdSchema.parse(req.query);

      console.log("Received GET request to /api/getProgress", userId);

      if (typeof userId !== 'string') {
        res.status(400).json({ message: "Invalid userId" });
        return;
      }
  

      const userProgress = await db.userProgress.findUnique({
        where: { userId: userId },
      });


      if (!userProgress) {
        res.status(404).json({ message: "Progress not found" });
        return;
      }

      res.status(200).json(userProgress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ message: "Failed to fetch progress", error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
