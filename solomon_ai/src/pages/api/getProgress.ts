// Import necessary libraries and middleware
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/api/lib/db";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'GET') {
    console.log("Received GET request to /api/getProgress");
    const { userId } = req.query;

    if (typeof userId !== 'string') {
      res.status(400).json({ message: "Invalid userId" });
      return;
    }

    try {
      const userProgress = await db.userProgress.findUnique({
        where: { userId: parseInt(userId, 10) },
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
