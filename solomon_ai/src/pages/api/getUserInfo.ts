// Import necessary libraries and middleware
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/api/lib/db";

// Define the schema for input validation
import * as z from "zod";

const getUserSchema = z.object({
  userId: z.string().uuid(), // Ensure the userId is a valid UUID
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Validate the request query
      const userId = req.query.userId;
      const parsed = getUserSchema.safeParse({ userId });

      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid user ID" });
      }      // Fetch user information from the database
      const user = await db.user.findUnique({
        where: { id: userId as any },
      
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Respond with user information
      res.status(200).json({ message: "User retrieved successfully", data: user });
    } catch (error) {
      console.error("Error retrieving user information:", error);
      res.status(500).json({
        message: "Failed to retrieve user information",
        error: (error as Error).message,
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
