import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/api/lib/db";
const { Configuration, OpenAI } = require("openai");
import { fetchUserInfo } from "@/utilis/fetchUserInfo";
import { v4 as uuidv4 } from "uuid";

const APIKEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: APIKEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { message, conversationId } = req.body;



   
      const messages = [
        {
          role: "system",
          content: `Hello ChatGPT, in this conversation, you embody the persona of 'SummarizeAPI'. You take a body of text from another passage and summarize it into 1-2 sentences that is used to generate a Image prompt based on the passage provided
                      Please observe these guidelines:
                      You are to summarize a passage to 1-2 sentences.
                      The response has to be written optimally for a image prompt.

                      Remember the reseponse that your provide will need to be summarized and optimize for creating a image based on the response.
                      Most of the repsonses are centered around spirtuality, so the theme should represent that.

                      Your response should always start with Image a...

                      Now, let's begin, Summarizer AI."
                      `,
        },

        { role: "user", content: message },
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 500,
        messages: messages,
      });

      const response = completion.choices[0].message.content;

      console.log("Logging the Resposne In The Backend", response)

      // Store the bot's response in the database

      // console.log("Loggin the REsponse", response);
      res.json({ message: response });
    } catch (error) {
      console.error("Error THIS IS HTE ERROR ON WHY", error.message);
      res
        .status(500)
        .json({ message: "Error occured while processing the request" });
    }
  }
}
