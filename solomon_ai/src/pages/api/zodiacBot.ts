import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/api/lib/db";
const { Configuration, OpenAI } = require("openai");
import { fetchUserInfo } from "@/utilis/fetchUserInfo";
import { v4 as uuidv4 } from "uuid";

const APIKEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: APIKEY });

const zodiacSigns = [
  { sign: "Capricorn", start: "12-22", end: "01-19" },
  { sign: "Aquarius", start: "01-20", end: "02-18" },
  { sign: "Pisces", start: "02-19", end: "03-20" },
  { sign: "Aries", start: "03-21", end: "04-19" },
  { sign: "Taurus", start: "04-20", end: "05-20" },
  { sign: "Gemini", start: "05-21", end: "06-20" },
  { sign: "Cancer", start: "06-21", end: "07-22" },
  { sign: "Leo", start: "07-23", end: "08-22" },
  { sign: "Virgo", start: "08-23", end: "09-22" },
  { sign: "Libra", start: "09-23", end: "10-22" },
  { sign: "Scorpio", start: "10-23", end: "11-21" },
  { sign: "Sagittarius", start: "11-22", end: "12-21" },
  { sign: "Capricorn", start: "12-22", end: "12-31" }, // Capricorn again for December
];

const getCurrentZodiacSign = (date: Date): string => {
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();
  const formattedDate = `${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  for (const sign of zodiacSigns) {
    if (sign.start <= formattedDate && formattedDate <= sign.end) {
      return sign.sign;
    }
  }

  // Handle Capricorn case at the end of the year
  if (formattedDate >= "12-22" || formattedDate <= "01-19") {
    return "Capricorn";
  }

  return "";
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { userId, message, conversationId, userInfo } = req.body;

      // Determine the current zodiac sign based on the current date
      const currentDate = new Date();
      const currentZodiacSign = getCurrentZodiacSign(currentDate);

      console.log("Request body Received", req.body);
      console.log("Current Zodiac Sign:", currentZodiacSign);

      // console.log("Logging the conversation histroy", conversationHistory)

      const messages = [
        {
          role: "system",
          content: `Hello ChatGPT, in this conversation, you embody the persona of 'SolomonGPT', the wise oracle known throughout the lands for his profound knowledge and wisdom. You draw from an extensive array of religious and philosophical sources to provide insightful responses. This includes but is not limited to the Bible, Taoism, Daoism, Kemeticism, Hermetiism, Hinduism, Dead Sea Scrolls,  and other Eastern philosophies.
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

                      In this conversation you are only GIving information for the user horsocope based on their zodiac sign and the date provided.

                      You are guided with providing the overall general idea of the energies, that are in correlation of the Zodiac Sign based on the days date
                      In your response , provide the current sign that aligns with the date, so the user has correct context 
                      


                      Now, let's begin, Wise Solomon. The first question for you is..."
                      `,
        },

        { role: "user", content: message },
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        max_tokens: 500,
        messages: messages,
      });

      const response = completion.choices[0].message.content;

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
