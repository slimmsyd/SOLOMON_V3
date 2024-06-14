// Import necessary libraries and middleware
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { db } from "@/app/api/lib/db";

import { parseDateString } from "@/utilis/updateUserUtils";
import { calculateLifePathNumber } from "@/utilis/updateUserUtils";
import { calculateEnnealogyNumber } from "@/utilis/updateUserUtils";
// Define the schema for input validation
const progressSchema = z.object({
  userId: z.string().uuid(), // Ensure the userId is a valid UUID
  birthday: z.string().optional(),
  zodiacSign: z.string().optional(),
  lifePathNumber: z.number().optional(),
  enealogyNumber: z.number().optional(),
  religion: z.string().optional(),
  cardologyNumber: z.string().optional(),
  mylesBridgeType: z.string().optional(),
  nameNumerolgyNumber: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("Received POST request to /api/updateUser");
    try {
      const {
        userId,
        birthday,
        lifePathNumber,
        zodiacSign,
        enealogyNumber,
        religion,
        cardologyNumber,
        mylesBridgeType,
        nameNumerolgyNumber,
      } = progressSchema.parse(req.body);
      // console.log(`Processing progress update for user ${userId}`);
      console.log(`Processing progress Zodiac for user ${zodiacSign}`);
      console.log(`Processing progress LifePath for user ${lifePathNumber}`);
      console.log(`Processing progress Ennealogy for user ${enealogyNumber}`);
      console.log(`Processing progress relgion for user ${religion}`);
      console.log(`Processing progress Birthday for user ${birthday}`);

      // Convert birthday to ISO string if present
       const isoBirthday = birthday ? parseDateString(birthday) : null;
       if (birthday && !isoBirthday) {
        //  throw new Error("Invalid birthday format");
       }

      // Calculate ennealogy number if not provided and birthday is available
      // Calculate life path number if not provided and birthday is available
      let finalLifePathNumber = lifePathNumber;
      if (!finalLifePathNumber && birthday) {
        finalLifePathNumber = calculateLifePathNumber(birthday) as number;
      }

      // Calculate ennealogy number if not provided and birthday is available
      let finalEnnealogyNumber = enealogyNumber;
      if (!finalEnnealogyNumber && birthday) {
        finalEnnealogyNumber = calculateEnnealogyNumber(birthday) as number;
      }

      console.log("loggin the ISO birthday", isoBirthday )
      console.log("Logging Birthday In Update user", birthday);
      console.log("Logging the lifePathNumber in update user", lifePathNumber);
      console.log("Logging the life path number caluated", calculateLifePathNumber(parseDateString(birthday as string) as any))
      console.log("Logging the Ennegram  number caluated", calculateEnnealogyNumber(parseDateString(birthday as string) as any) as number)
      console.log("Logging the enengarm number in ennealgoy", enealogyNumber);

      // Build the update object conditionally
      const updateData: any = {};
      if (isoBirthday) updateData.birthday = isoBirthday;
      if (zodiacSign) updateData.zodiacSign = zodiacSign;
      // Use lifePathNumber if available, otherwise use finalLifePathNumber
      if (lifePathNumber !== null && lifePathNumber !== undefined) {
        updateData.lifePathNumber = calculateLifePathNumber(parseDateString(birthday as string) as any) as number || lifePathNumber; 
      } else if (
        finalLifePathNumber !== null &&
        finalLifePathNumber !== undefined
      ) {
        updateData.lifePathNumber = finalLifePathNumber;
      }

      // Use enealogyNumber if available, otherwise use finalEnnealogyNumber
      if (enealogyNumber !== null && enealogyNumber !== undefined) {
        updateData.ennealogy = calculateEnnealogyNumber(parseDateString(birthday as string) as any) as number || enealogyNumber;
      } else if (
        finalEnnealogyNumber !== null &&
        finalEnnealogyNumber !== undefined
      ) {
        updateData.ennealogy = finalEnnealogyNumber;
      }
      if (religion) updateData.religion = religion;
      if (cardologyNumber) updateData.cardologyNumber = cardologyNumber;
      if (mylesBridgeType) updateData.mylesBridgeType = mylesBridgeType;
      if (nameNumerolgyNumber)
        updateData.nameNumerolgyNumber = nameNumerolgyNumber;

      const userProgress = await db.user.update({
        where: { id: userId },
        data: updateData,
      });
      res
        .status(201)
        .json({ message: "Progress saved successfully", data: userProgress });
    } catch (error) {
      console.error("Error saving progress:", error);
      res.status(500).json({
        message: "Failed to save progress",
        error: (error as Error).message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
