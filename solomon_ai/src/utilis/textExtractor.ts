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

const zodiacAnimals = [
  "Rat",
  "Ox",
  "Tiger",
  "Rabbit",
  "Dragon",
  "Snake",
  "Horse",
  "Goat",
  "Monkey",
  "Rooster",
  "Dog",
  "Pig",
];





//Extract completion text 

export function checkCompletionText(responseText: string ): boolean | null {
  if (!responseText) return null; // Add nullish check
  const phrases = [
      "I see... I gather knowledge of you",
      "if you haven't been redirected send one more message to complete the process"
  ];

  for (const phrase of phrases) {
      if (responseText.includes(phrase)) {
          return true;
      }
  }

  return false;
}


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



// Function to get Chinese Zodiac sign
export const getChineseZodiac = (birthYear: number): string => {

  const index = (birthYear - 4) % 12; // 4 because 1900 is Rat and (1900 - 4) % 12 = 0
  return zodiacAnimals[index];
};

// Function to extract the year from a date string
export const getYearFromDateString = (dateString: string): number | null => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date.getUTCFullYear(); // Extracts the year from the date
};


//Getting hte Egyptian Zodiac SIgn Cacluated 
type ZodiacSign = {
  name: string;
  dates: { start: string; end: string }[];
};

const egyptianZodiacSigns: ZodiacSign[] = [
  {
    name: "The Nile (Satis)",
    dates: [
      { start: "01-01", end: "01-07" },
      { start: "06-19", end: "06-28" },
      { start: "09-01", end: "09-07" },
      { start: "11-18", end: "11-26" },
    ],
  },
  {
    name: "Amun-Ra",
    dates: [
      { start: "01-08", end: "01-21" },
      { start: "02-01", end: "02-11" },
    ],
  },
  {
    name: "Mut",
    dates: [
      { start: "01-22", end: "01-31" },
      { start: "09-08", end: "09-22" },
    ],
  },
  {
    name: "Geb",
    dates: [
      { start: "02-12", end: "02-29" },
      { start: "08-20", end: "08-31" },
    ],
  },
  {
    name: "Osiris",
    dates: [
      { start: "03-01", end: "03-10" },
      { start: "11-27", end: "12-18" },
    ],
  },
  {
    name: "Isis",
    dates: [
      { start: "03-11", end: "03-31" },
      { start: "10-18", end: "10-29" },
      { start: "12-19", end: "12-31" },
    ],
  },
  {
    name: "Thoth",
    dates: [
      { start: "04-01", end: "04-19" },
      { start: "11-08", end: "11-17" },
    ],
  },
  {
    name: "Horus",
    dates: [
      { start: "04-20", end: "05-07" },
      { start: "08-12", end: "08-19" },
    ],
  },
  {
    name: "Anubis",
    dates: [
      { start: "05-08", end: "05-27" },
      { start: "06-29", end: "07-13" },
    ],
  },
  {
    name: "Seth",
    dates: [
      { start: "05-28", end: "06-18" },
      { start: "09-28", end: "10-02" },
    ],
  },
  {
    name: "Bastet",
    dates: [
      { start: "07-14", end: "07-28" },
      { start: "09-23", end: "09-27" },
      { start: "10-03", end: "10-17" },
    ],
  },
  {
    name: "Sekhmet",
    dates: [
      { start: "07-29", end: "08-11" },
      { start: "10-30", end: "11-07" },
    ],
  },
];

const formatDateString = (date: Date): string => {
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  return `${month}-${day}`;
};

export const getEgyptianZodiac = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";

  const formattedDate = formatDateString(date);

  for (const sign of egyptianZodiacSigns) {
    for (const period of sign.dates) {
      if (formattedDate >= period.start && formattedDate <= period.end) {
        return sign.name;
      }
    }
  }

  return "No matching Egyptian Zodiac sign";
};


type CelticZodiacSign = {
  name: string;
  startDate: string;
  endDate: string;
  details: {
    ogham: string;
    description: string;
    color: string;
    gemstone: string;
    animals: string[];
  };
};

const celticZodiacSigns: CelticZodiacSign[] = [
  {
    name: "Rowan",
    startDate: "01-21",
    endDate: "02-17",
    details: {
      ogham: "Luis",
      description: "Strength in the areas of insight and discernment.",
      color: "gray",
      gemstone: "peridot",
      animals: ["crane", "green dragon"],
    },
  },
  {
    name: "Ash",
    startDate: "02-18",
    endDate: "03-17",
    details: {
      ogham: "Nuin",
      description: "Peace and tranquility.",
      color: "green",
      gemstone: "coral",
      animals: ["seal", "seahorse", "seagull"],
    },
  },
  {
    name: "Alder",
    startDate: "03-18",
    endDate: "04-14",
    details: {
      ogham: "Fearn",
      description: "Moral and physical courage.",
      color: "red",
      gemstone: "ruby",
      animals: ["bear", "fox", "hawk"],
    },
  },
  {
    name: "Willow",
    startDate: "04-15",
    endDate: "05-12",
    details: {
      ogham: "Saille",
      description: "Intuition, creativity, and artistry.",
      color: "yellow",
      gemstone: "moonstone",
      animals: ["adder", "hare", "sea serpent"],
    },
  },
  {
    name: "Hawthorn",
    startDate: "05-13",
    endDate: "06-09",
    details: {
      ogham: "Huathe",
      description: "Patience, thoughtfulness, and hope.",
      color: "purple",
      gemstone: "topaz",
      animals: ["bee", "owl"],
    },
  },
  {
    name: "Oak",
    startDate: "06-10",
    endDate: "07-07",
    details: {
      ogham: "Duir",
      description: "Reliability, diligence, and emotional strength.",
      color: "black",
      gemstone: "diamond",
      animals: ["wren", "otter", "white horse"],
    },
  },
  {
    name: "Holly",
    startDate: "07-08",
    endDate: "08-04",
    details: {
      ogham: "Tinne",
      description: "Physical strength and star power.",
      color: "silver",
      gemstone: "carnelian",
      animals: ["cat", "unicorn"],
    },
  },
  {
    name: "Hazel",
    startDate: "08-05",
    endDate: "09-01",
    details: {
      ogham: "Coll",
      description: "Intellect, maturity, and perspective.",
      color: "brown",
      gemstone: "amethyst",
      animals: ["crane", "salmon"],
    },
  },
  {
    name: "Vine",
    startDate: "09-02",
    endDate: "09-29",
    details: {
      ogham: "Muin",
      description: "Uninhibited nature and foresight.",
      color: "pastels",
      gemstone: "emerald",
      animals: ["lizard", "hound", "white swan"],
    },
  },
  {
    name: "Ivy",
    startDate: "09-30",
    endDate: "10-27",
    details: {
      ogham: "Gort",
      description: "Determination and willpower.",
      color: "blue",
      gemstone: "opal",
      animals: ["boar", "butterfly", "goose"],
    },
  },
  {
    name: "Reed",
    startDate: "10-28",
    endDate: "11-24",
    details: {
      ogham: "Ngetal",
      description: "Open-minded attitude and worldly sophistication.",
      color: "orange",
      gemstone: "jasper",
      animals: ["hound", "owl"],
    },
  },
  {
    name: "Elder",
    startDate: "11-25",
    endDate: "12-23",
    details: {
      ogham: "Ruis",
      description: "Endings and new beginnings.",
      color: "red",
      gemstone: "amber",
      animals: ["raven", "blackbird"],
    },
  },
  // Adding missing Birch entry for completeness
  {
    name: "Birch",
    startDate: "12-24",
    endDate: "01-20",
    details: {
      ogham: "Beith",
      description: "Rebirth and renewal.",
      color: "white",
      gemstone: "quartz",
      animals: ["stag", "white stag"],
    },
  }
];



// Function to get the Celtic Zodiac sign
export const getCelticZodiac = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";

  const formattedDate = formatDateString(date);

  for (const sign of celticZodiacSigns) {
    if (formattedDate >= sign.startDate && formattedDate <= sign.endDate) {
      return sign.name;
    }
  }

  return "No matching Celtic Zodiac sign";
};






type NativeAmericanZodiacSign = {
  name: string;
  startDate: string;
  endDate: string;
  details: {
    description: string;
    animal: string;
    element: string;
    color: string;
    stone: string;
  };
};

const nativeAmericanZodiacSigns: NativeAmericanZodiacSign[] = [
  {
    name: "Otter",
    startDate: "01-20",
    endDate: "02-18",
    details: {
      description: "Independent and quirky",
      animal: "Otter",
      element: "Air",
      color: "Silver",
      stone: "Turquoise",
    },
  },
  {
    name: "Wolf",
    startDate: "02-19",
    endDate: "03-20",
    details: {
      description: "Passionate and emotional",
      animal: "Wolf",
      element: "Water",
      color: "Blue-Green",
      stone: "Jade",
    },
  },
  {
    name: "Falcon",
    startDate: "03-21",
    endDate: "04-19",
    details: {
      description: "Natural-born leader",
      animal: "Falcon",
      element: "Fire",
      color: "Yellow",
      stone: "Opal",
    },
  },
  {
    name: "Beaver",
    startDate: "04-20",
    endDate: "05-20",
    details: {
      description: "Determined and methodical",
      animal: "Beaver",
      element: "Earth",
      color: "Blue",
      stone: "Chrysocolla",
    },
  },
  {
    name: "Deer",
    startDate: "05-21",
    endDate: "06-20",
    details: {
      description: "Lively and fun",
      animal: "Deer",
      element: "Air",
      color: "Green",
      stone: "Agate",
    },
  },
  {
    name: "Woodpecker",
    startDate: "06-21",
    endDate: "07-21",
    details: {
      description: "Nurturing and caring",
      animal: "Woodpecker",
      element: "Water",
      color: "Pink",
      stone: "Rose Quartz",
    },
  },
  {
    name: "Salmon",
    startDate: "07-22",
    endDate: "08-21",
    details: {
      description: "Energetic and focused",
      animal: "Salmon",
      element: "Fire",
      color: "Red",
      stone: "Carnelian",
    },
  },
  {
    name: "Bear",
    startDate: "08-22",
    endDate: "09-21",
    details: {
      description: "Practical and grounded",
      animal: "Bear",
      element: "Earth",
      color: "Brown",
      stone: "Amethyst",
    },
  },
  {
    name: "Raven",
    startDate: "09-22",
    endDate: "10-22",
    details: {
      description: "Charismatic and dynamic",
      animal: "Raven",
      element: "Air",
      color: "Blue",
      stone: "Jasper",
    },
  },
  {
    name: "Snake",
    startDate: "10-23",
    endDate: "11-22",
    details: {
      description: "Mysterious and ambitious",
      animal: "Snake",
      element: "Water",
      color: "Violet",
      stone: "Copper",
    },
  },
  {
    name: "Owl",
    startDate: "11-23",
    endDate: "12-21",
    details: {
      description: "Adventurous and independent",
      animal: "Owl",
      element: "Fire",
      color: "Gold",
      stone: "Obsidian",
    },
  },
  {
    name: "Goose",
    startDate: "12-22",
    endDate: "01-19",
    details: {
      description: "Determined and ambitious",
      animal: "Goose",
      element: "Earth",
      color: "White",
      stone: "Quartz",
    },
  },
];
// Function to get the Native American Zodiac sign
export const getNativeAmericanZodiac = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";

  const formattedDate = formatDateString(date);

  for (const sign of nativeAmericanZodiacSigns) {
    if (formattedDate >= sign.startDate && formattedDate <= sign.endDate) {
      return sign.name;
    }
  }

  return "No matching Native American Zodiac sign";
};

// Example usage:
const birthDateString = "2000-09-01T04:00:00.000Z";
const nativeAmericanZodiacSign = getNativeAmericanZodiac(birthDateString);
console.log(`Native American Zodiac Sign: ${nativeAmericanZodiacSign}`);
