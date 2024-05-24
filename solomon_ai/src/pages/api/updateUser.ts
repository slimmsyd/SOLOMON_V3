// Import necessary libraries and middleware
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { db } from "@/app/api/lib/db";

// Define the schema for input validation
const progressSchema = z.object({
  userId: z.number(),
  birthday: z.string().optional(),
  zodiacSign: z.string().optional(),
  lifePathNumber: z.number().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("Received POST request to /api/updateUser");
    try {
      const { userId, birthday, zodiacSign, lifePathNumber } = progressSchema.parse(
        req.body
      );
      console.log(`Processing progress update for user ${userId}`);
      console.log(`Processing progress Zodiac for user ${zodiacSign}`);
      console.log(`Processing progress LifePath for user ${lifePathNumber}`);

    

      // Build the update object conditionally
      const updateData: any = {};
      if (birthday) updateData.birthday = birthday;
      if (zodiacSign) updateData.zodiacSign = zodiacSign;
      if (lifePathNumber) updateData.lifePathNumber = lifePathNumber;

      const userProgress = await db.user.update({
        where: { id: userId },
        data: updateData

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
