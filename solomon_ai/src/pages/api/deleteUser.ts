// Import necessary libraries and middleware
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { db } from "@/app/api/lib/db";

// Define the schema for input validation
const deleteUserSchema = z.object({
  userId: z.string().uuid(), // Ensure the userId is a valid UUID
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    console.log("Received DELETE request to /api/deleteUser");


   

    try {
      const { userId } = deleteUserSchema.parse(req.body);
      console.log(`Processing delete request for user ${userId}`);


      // Delete the user from the database
      const deletedUser = await db.user.delete({
        where: { id: userId },
      });

      res
        .status(200)
        .json({ message: "User deleted successfully", data: deletedUser });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        message: "Failed to delete user",
        error: (error as Error).message,
      });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
