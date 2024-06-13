// Import necessary libraries and middleware
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { db } from "@/app/api/lib/db";
// Define the schema for input validation
const progressSchema = z.object({
  userId: z.string().uuid(), // Ensure the userId is a valid UUID
  currentQuestion: z.number(),
  responses: z.array(
    z.union([
      z.string(),
      z.object({
        question: z.string().nullable().optional(),
        response: z.string().optional(),
        firstConvo: z.boolean().optional(),
      }),
    ])
  ).optional(),
  onComplete: z.boolean().optional()

});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("Received POST request to /api/saveProgress");
    try {
      const { userId, currentQuestion, responses, onComplete } = progressSchema.parse(
        req.body
      );
      console.log(`Processing progress update for user ${userId}`);

      // Check if the user has completed all questions

      // Upsert the progress data for the user
      const userProgress = await db.userProgress.upsert({
        where: { userId },
        update: { currentQuestion, responses, onComplete },
        create: { userId, currentQuestion, responses },
      });

      res
        .status(201)
        .json({ message: "Progress saved successfully", data: userProgress });
    } catch (error) {
      console.error("Error saving progress:", error);
      res
        .status(500)
        .json({
          message: "Failed to save progress",
          error: (error as Error).message,
        });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
