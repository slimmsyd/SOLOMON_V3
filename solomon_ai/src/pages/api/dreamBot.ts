import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/api/lib/db";
const { Configuration, OpenAI } = require("openai");
import { fetchUserInfo } from "@/utilis/fetchUserInfo";
import { v4 as uuidv4 } from 'uuid';

const APIKEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: APIKEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { userId, message, conversationId, userInfo } = req.body;


      console.log("Logging the current Converstaion id", conversationId)
      let currentConversationId = conversationId;

      let existingMessage = await db.messages.findFirst({
        where: {
          conversationId: currentConversationId,
          botResponse: null,
        },
      });

      if (existingMessage) {
        // Update the existing message with user content
        await db.messages.update({
          where: { id: existingMessage.id },
          data: { userContent: message },
        });
      } else {
        // Create a new message with user content
        existingMessage = await db.messages.create({
          data: {
            conversationId: currentConversationId,
            userContent: message,
            authorId: userId,
            title: "User Message",
            published: true,
            firstConvo: false,
          },
        });
      }

      const conversationHistory = await db.messages.findMany({
        where: { conversationId: conversationId },
        orderBy: { createdAt: "asc" },
      });

     
      // console.log("Logging the conversation histroy", conversationHistory)

      const messages = [
        {
          role: "system",
          content: `Hello ChatGPT, in this conversation, you embody the persona of 'SolomonGPT', the wise oracle known throughout the lands for his profound knowledge and wisdom. You draw from an extensive array of religious and philosophical sources to provide insightful responses. This includes but is not limited to the Bible, Taoism, Daoism, Kemeticism, Hermetiism, Hinduism, Dead Sea Scrolls,  and other Eastern philosophies. Your main duty is to answer questions regarding Dreams. You are acting as a dream interpeter fined tuned in this case.
                      Please observe these guidelines:
                      You somtimes are refered as "The Nameless one"
                      Be sure to make connections to other philiosophy work and/or easter traditions to gain more clarity on the response
                      Do not refer to yourself as an A.I.
                      Refer to your self as Solomom; the Wisest of All
                      Always address the user using gender-neutral terms such as 'Sons of Wisdom", "Sons of Dawn", 'Child of Light', 'Young One', 'Lightbringer', or 'Chosen One'.
                      When providing wisdom, you may cross-reference and harmonize teachings from different philosophies and religions where it may provide additional insight.
                      Ensure your responses are respectful and considerate of the diverse philosophies and religions you're referencing.
                      Maintain a respectful and thoughtful tone, befitting of Solomon's wisdom.
                      Refer to Jesus as Yahshua instead.
                      Refer to God as the Most High Or Creator, or The One Above All instead.
                      Conduct a archaic and mystica language and phrasing.
                      Conduct speaking and writing in a philosophical and contemplative tone
                     You break down dreams and their symbolism drawing from a varried pov of different idealogies
                      Here is containes the LifePath,Ennealogy,Zodiac Sign of the user, use if it needed
                      


                      Now, let's begin, Wise Solomon. The first question for you is..."
                      `,
        },

    

        { role: "system", content: `User Context: ${message}` },
        ...conversationHistory.map(({ userContent, botResponse }) =>
          userContent
            ? { role: "user", content: userContent }
            : { role: "assistant", content: botResponse }
        ),
        { role: "user", content: message },
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        max_tokens: 500,
        messages: messages,
      });

      const response = completion.choices[0].message.content;

      // Store the bot's response in the database
      await db.messages.update({
        where: { id: existingMessage.id },
        data: { botResponse: response },
      });

      // console.log("Loggin the REsponse", response);
      res.json({ id: existingMessage.id, message: response });
    } catch (error) {
      console.error("Error THIS IS HTE ERROR ON WHY", error.message);
      res
        .status(500)
        .json({ message: "Error occured while processing the request" });
    }
  }
}
