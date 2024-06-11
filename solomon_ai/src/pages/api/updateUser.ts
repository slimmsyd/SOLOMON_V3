// Import necessary libraries and middleware
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { db } from "@/app/api/lib/db";

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
  nameNumerolgyNumber: z.string().optional()
});

const parseDateString = (dateString: string): string | null => {
  // Regular expressions to match common date formats
  const datePatterns = [
    /\b(\d{1,2})(?:st|nd|rd|th)? day of (\w+) in the year (\d{4})\b/i, // e.g., "1st day of September in the year 2000"
    /\b(\w+)\s(\d{1,2})(?:st|nd|rd|th)?,?\s(\d{4})\b/i, // e.g., "September 1st, 2000"
    /\b(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})\b/i, // e.g., "01/09/2000", "01-09-2000", "01.09.2000"
  ];

  for (const pattern of datePatterns) {
    const match = dateString.match(pattern);
    if (match) {
      // If the matched pattern is "1st day of September in the year 2000"
      if (pattern === datePatterns[0]) {
        const day = match[1];
        const month = match[2];
        const year = match[3];
        return new Date(`${month} ${day}, ${year}`).toISOString();
      }

      // If the matched pattern is "September 1st, 2000"
      if (pattern === datePatterns[1]) {
        const month = match[1];
        const day = match[2];
        const year = match[3];
        return new Date(`${month} ${day}, ${year}`).toISOString();
      }

      // If the matched pattern is "01/09/2000"
      if (pattern === datePatterns[2]) {
        const day = match[1];
        const month = match[2];
        const year = match[3].length === 2 ? `20${match[3]}` : match[3]; // Handle 2-digit year
        return new Date(`${month}/${day}/${year}`).toISOString();
      }
    }
  }

  // If no pattern matches, return null
  return null;
};
const calculateEnnealogyNumber = (dateString: string): number | null => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;

  const month = date.getUTCMonth() + 1; // getUTCMonth() returns month from 0-11
  const day = date.getUTCDate();

  const initialNumber = month + day;
  return reduceToSingleDigit(initialNumber);
};

const reduceToSingleDigit = (num: number): number => {
  while (num >= 10) {
    num = num
      .toString()
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
};


// Function to calculate life path number using Pythagorean method
const calculateLifePathNumber = (dateString: string): number | null => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;

  const digits = date.getUTCFullYear().toString().split('')
    .concat((date.getUTCMonth() + 1).toString().split(''))
    .concat(date.getUTCDate().toString().split(''))
    .map(Number);

  const initialNumber = digits.reduce((sum, digit) => sum + digit, 0);
  return reduceToSingleDigit(initialNumber);
};



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
        nameNumerolgyNumber
      } = progressSchema.parse(req.body);
      // console.log(`Processing progress update for user ${userId}`);
      // console.log(`Processing progress Zodiac for user ${zodiacSign}`);
      // console.log(`Processing progress LifePath for user ${lifePathNumber}`);
      // console.log(`Processing progress Ennealogy for user ${enealogyNumber}`);
      // console.log(`Processing progress relgion for user ${religion}`);
      // console.log(`Processing progress Birthday for user ${birthday}`);

   // Convert birthday to ISO string if present
   const isoBirthday = birthday ? parseDateString(birthday) : null;
   if (birthday && !isoBirthday) {
     throw new Error("Invalid birthday format");
   }

   // Calculate ennealogy number if not provided and birthday is available
  // Calculate life path number if not provided and birthday is available
  let finalLifePathNumber = lifePathNumber;
  if (!finalLifePathNumber && isoBirthday) {
    finalLifePathNumber = calculateLifePathNumber(isoBirthday) as number;
  }

  // Calculate ennealogy number if not provided and birthday is available
  let finalEnnealogyNumber = enealogyNumber;
  if (!finalEnnealogyNumber && isoBirthday) {
    finalEnnealogyNumber = calculateEnnealogyNumber(isoBirthday) as number ;
  }



       
      // Build the update object conditionally
      const updateData: any = {};
      if (isoBirthday) updateData.birthday = isoBirthday;
      if (zodiacSign) updateData.zodiacSign = zodiacSign;
      if (finalLifePathNumber !== null && finalLifePathNumber !== undefined) updateData.lifePathNumber = finalLifePathNumber;
      if (finalEnnealogyNumber !== null && finalEnnealogyNumber !== undefined) updateData.ennealogy = finalEnnealogyNumber;
      if (religion) updateData.religion = religion;
      if(cardologyNumber) updateData.cardologyNumber = cardologyNumber;
      if(mylesBridgeType) updateData.mylesBridgeType = mylesBridgeType;
      if(nameNumerolgyNumber) updateData.nameNumerolgyNumber = nameNumerolgyNumber;

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
