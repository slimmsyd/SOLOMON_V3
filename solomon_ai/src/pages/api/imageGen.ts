import { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAI } = require("openai");

const APIKEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: APIKEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { userId, prompt, conversationId, userInfo } = req.body;


      console.log("API endpoint reached")

      // Create the image generation request
      const response = await openai.images.generate({
        prompt: prompt,
        n: 1, // Number of images to generate
        size: "1024x1024", // Size of the image
      });

      const imageUrl = response.data[0].url;

      // Store the bot's response in the database or perform any other necessary actions

      res.json({ imageUrl: imageUrl });
    } catch (error) {
      console.error("Error occurred while processing the request:", error.message);
      res.status(500).json({ message: "Error occurred while processing the request" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
