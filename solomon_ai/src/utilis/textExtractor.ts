// textExtractors.ts
export const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo",
    "Virgo", "Libra", "Scorpio", "Sagittarius",
    "Capricorn", "Aquarius", "Pisces"
  ];

  export const religions = [
    "Christianity",
    "Islam",
    "Islamic",
    "Hinduism",
    "Buddhism",
    "Judaism",
    "Sikhism",
    "Taoism",
    "Confucianism",
    "Baha'i Faith",
    "Jainism",
    "Shinto",
    "Zoroastrianism",
    "New Age Spirituality",
    "Wicca",
    "Paganism",
    "Shamanism",
    "Sufism",
    "Gnosticism",
    "Theosophy",
    "Mysticism",
    "Esotericism",
    "Occultism",
    "Metaphysics",
    "Spiritualism"
];



// Create a map for efficient lookup
const religionsMap = new Map(religions.map(religion => [religion, religion]));

// Enhanced function to extract religion
export const extractReligion = (responseText: string | null | undefined): string | null => {
  if (!responseText) return null; // Add nullish check

  // Check if the response contains any of the religions (case-sensitive)
  for (const word of responseText.split(/\s+/)) { // Split the response text into words
    if (religionsMap.has(word)) {
      return word;
    }
  }

  return null;
};

  
// Enhanced function to extract life path number
export const extractLifePathNumber = (responseText: string | null | undefined): number | null => {
    if (!responseText) return null; // Add nullish check
  
    // Define multiple patterns to match different possible phrases
    const patterns = [
      /life path (?:number|of the number) (\d+)/i, // Matches "life path number" or "life path of the number"
      /your life path is (\d+)/i, // Matches "your life path is 5"
      /life path: (\d+)/i, // Matches "life path: 5"
      /further reduced, we get \d+\+\d+ = (\d+)/i, // Matches "further reduced, we get 1+2 = 3"
      /life path of (\d+)/i // Matches "life path of 3"
    ];
  
    for (const pattern of patterns) {
      const match = responseText.match(pattern);
      if (match) {
        return parseInt(match[1], 10);
      }
    }
  
    return null;
  };

  export const extractEnnealogyNumber = (responseText: string | null | undefined): number | null => {
    if (!responseText) return null; // Add nullish check
  
    // Define multiple patterns to match different possible phrases
    const patterns = [
      /Ennealogy path (?:number|of the number) (\d+)/i, // Matches "life path number" or "life path of the number"
      /your Ennealogy path is (\d+)/i, // Matches "your life path is 5"
      /Ennealogy path: (\d+)/i, // Matches "life path: 5"
      /further reduced, we get \d+\+\d+ = (\d+)/i, // Matches "further reduced, we get 1+2 = 3"
      /Ennealogy path of (\d+)/i // Matches "life path of 3"
    ];
  
    for (const pattern of patterns) {
      const match = responseText.match(pattern);
      if (match) {
        return parseInt(match[1], 10);
      }
    }
  
    return null;
  };
  
  
  // Enhanced function to extract zodiac sign
  export const extractZodiacSign = (responseText: string | null | undefined): string | null => {
    if (!responseText) return null; // Add nullish check
  
    // Define the list of zodiac signs
   
    // Check if the response contains any of the zodiac signs
    for (const sign of zodiacSigns) {
      const regex = new RegExp(sign, 'i');
      if (regex.test(responseText)) {
        return sign;
      }
    }
  
    return null;
  };
  

// Function to extract birthday from the response text
export const extractBirthday = (responseText: string | null | undefined): string | null => {
  if (!responseText) return null; // Add nullish check

  // Enhanced regex pattern to capture common date formats
  // Enhanced regex pattern to capture common date formats
  const birthdayMatch = responseText.match(
    /(?:born on|birthdate is| of |birthday is|)\b(\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4}|\b(?:January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}(?:st|nd|rd|th)?,? \d{4}|\b\d{1,2}(?:st|nd|rd|th)? day of (?:January|February|March|April|May|June|July|August|September|October|November|December) in the year \d{4})\b/i
  );

  // Match the pattern against the response text

  // Return the captured birthday if a match is found
  return birthdayMatch ? birthdayMatch[1] : null;
};