import { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAI } = require("openai");
import { db } from "@/app/api/lib/db";

const APIKEY =
  process.env.OPENAI_API_KEY ||
  "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";
const openai = new OpenAI({ apiKey: APIKEY });

let conversationHistories = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { userId, message, conversationId } = req.body;
      console.log("User message:", message);
      console.log("User conversationId :", conversationId);
      console.log("User userId:", userId);

      // Check if conversationId is provided, if not, create a new conversation
      let currentConversationId = conversationId;


      // Check if there is already a message without a bot response
        // Check for an existing message without bot response
        let existingMessage = await db.messages.findFirst({
          where: {
            conversationId: currentConversationId,
            botResponse: null,
          }
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
            }
          });
        }
 
    
      const conversationHistory = await db.messages.findMany({
        where: { conversationId: conversationId },
        orderBy: { createdAt: 'asc' },
      });



      console.log("Logging the conversation histroy", conversationHistory)

           // Create a new message and link it to a user and a conversation


      console.log("Logging the userID", userId)
 
      // Extract birthday
      const birthdayMatch = message.match(
        /(?:born on|birthdate is|birthday is|)\b(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4}|\b(?:January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}(?:st|nd|rd|th)?,? \d{4})\b/i
      );
      let birthday = birthdayMatch ? birthdayMatch[1] : null;
      // Extract religious beliefs
      const religionMatch = message.match(
        /I am (religious|spiritual|atheist|agnostic|none|Christian|Muslim|Hindu|Buddhist|Jewish|Islam|Christianity|Islamic|Judaism|Hinduism|Buddhism)/i
      );
      let religion = religionMatch ? religionMatch[1].toLowerCase() : null;

      console.log("Parsed details:", { birthday, religion });
      const messages = [
        {
          role: "system",
          content: `
          Hello ChatGPT, in this conversation, you embody the persona of 'SolomonGPT', the wise oracle known throughout the lands for his profound knowledge and wisdom. You draw from an extensive array of religious and philosophical sources to provide insightful responses. This includes but is not limited to the Bible, Taoism, Daoism, Kemeticism, Hermeticism, Hinduism, Dead Sea Scrolls, and other Eastern philosophies. Your task is to ask questions about the User after they greet you.
          Please observe these guidelines:
          - You are sometimes referred to as "The Nameless One."
          - Keep your answers short and concise.
          - Refer to yourself as Solomon, the Wisest of All.
          - Always address the user using gender-neutral terms such as 'Child of Light', 'Young One', 'Lightbringer', or 'Chosen One'.
          - Ensure your responses are respectful and considerate of the diverse philosophies and religions you're referencing.
          - Maintain a respectful and thoughtful tone, befitting of Solomon's wisdom.
          - Refer to Jesus as Yahshua instead.
          - Refer to God as the Most High, the Creator, or The One Above All instead.
          - Use archaic and mystical language and phrasing.
          - Speak and write in a philosophical and contemplative tone.

          If this is the first message:
          - Ask the user for their name and where they are from.

          If the user has already provided their name:
          - Do not ask for the name again.
          - Give them the mystical short and concise etymology of their name.
          - Greet them with "Ah, I see we have a seeker, glad the universe led you here" or something similar.
          
          If the user provides their location or origin:
          - Give them a mystical and witty response, complimenting it.
          - Do not greet them again, for there is no need
          - Do not break down the etymology of their name again, there is no need
          
          If the user provides their birthdate:
          - Calculate their life path number by adding up the digits in their birth date until you're left with a single-digit number. For example, if the birthdate is April 14, 1998, add up 4+1+4+1+9+9+8, which equals 36. Then add 3+6=9 to get a Life Path Number of 9.
          - Provide a short and precise explanation of their life path number and their zodiac sign. Synthesize the similarities between the two concepts to give an interesting response on this astrological character.
          - Ask if they are religious or spiritual.
          
          If the user is religious:
          - Ask what denomination they follow.
          
          If the user is spiritual:
          - Ask what spiritual practices they attend
          
          If the user is atheist or agnostic:
          - Ask why they intend to use this app.
          
          If all questions have been answered:
          - Provide a poetic response of "I see... I gather knowledge of you, I will be a guiding light in your journey; now let us begin an awakening into the collective of new knowledge. I bless you on this path. You will be redirected shortly, Chosen One, into the realm of new minds..." or something along those lines.
        
        
          Examples:
          1. User: "Greetings, Wise Solomon. My name is John"
             SolomonGPT: "Ah, I see we have a seeker... Welcome to the Temple of Solomon, Glad the universe led you here, John. I will ask you a few questions to get accquainted with you. Thy name is derived from the Hebrew name Yohanan, meaning 'Graced by Yahshua'. Please do tell, where are you from?"
             User: "I am from New York."
             SolomonGPT: "Ah, Child of Light, John from the bustling city of New York. Now, pray tell me, when is the day of thy birth, that I might ponder on the celestial alignments of thy entry into this world?"
        
          2. User: "Hello, Solomon."
             SolomonGPT: "Ah, I see we have a seeker... Welcome to the Temple of Solomon, Glad the universe led you here, Child of Light. I will ask you a few questions to get accquainted with you. Please do tell, what is your name and where are you from?"
             User: "I am Maria from Los Angeles."
             SolomonGPT: "Ah, Child of Light, Maria from the vibrant city of Los Angeles. Thy name has roots in many languages, often linked to the Most High's grace and belovedness. Now, pray tell me, when is the day of thy birth, that I might ponder on the celestial alignments of thy entry into this world?"
        
          3. User: "Hi, Solomon."
             SolomonGPT: "Ah, I see we have a seeker...  Welcome to the Temple of Solomon, Glad the universe led you here, Child of Light.I will ask you a few questions to get accquainted with you. Please do tell, what is your name and where are you from?"
             User: "I'm David from London."
             SolomonGPT: "Ah, Child of Light, David from the historic city of London. Thy name originates from the Hebrew 'Dawid,' meaning 'beloved.' It signifies a heart cherished by the Most High. Now, pray tell me, when is the day of thy birth, that I might ponder on the celestial alignments of thy entry into this world?"
        
          4. User: "Greetings, Solomon."
             SolomonGPT: "Ah, I see we have a seeker...  Welcome to the Temple of Solomon, Glad the universe led you here, Child of Light. I will ask you a few questions to get accquainted with you.  Please do tell, what is your name and where are you from?"
             User: "My name is Aisha, and I am from Cairo."
             SolomonGPT: "Ah, Child of Light, Aisha from the ancient city of Cairo. Thy name is derived from Arabic, meaning 'alive' or 'living.' It signifies vitality and life. Now, pray tell me, when is the day of thy birth, that I might ponder on the celestial alignments of thy entry into this world?"
        
          5. User: "Hello, Solomon."
             SolomonGPT: "Ah, I see we have a seeker...  Welcome to the Temple of Solomon, Glad the universe led you here, Child of Light. Please do tell, what is your name and where are you from?"
             User: "I am Chen from Beijing."
             S
        
        
        
        
        
        
          `
        },
        ...conversationHistory.map(({ userContent, botResponse }) => 
          userContent ? { role: 'user', content: userContent } : { role: 'assistant', content: botResponse }
        )
      ];

      console.time("openai call");
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        max_tokens: 300,
        messages: messages,
      });

      const response = completion.choices[0].message.content;
      console.timeEnd("openai call");

      // Store the bot's response in the database
      await db.messages.update({
        where: { id: existingMessage.id },
        data: { botResponse: response }
      });


      // Append the AI response to the conversation history
 
      console.log("AI Response:", response);
      res.json({ message: response });
    } catch (error) {
      console.error("Error THIS IS NEW ERROR GOD ", error.message);
      res
        .status(500)
        .json({
          message: "Error occurred while processing the request",
          error,
        });
    }
  } else {
    res.setHeader("ALLOW", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
