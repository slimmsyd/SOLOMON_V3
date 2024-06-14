export const parseDateString = (dateString: string): string | null => {
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


  export const calculateEnnealogyNumber = (dateString: string): number | null => {
    const date = new Date(dateString);

    console.log("Logging the Date string", date)
    console.log("Logging the date", dateString)
    if (isNaN(date.getTime())) return null;
  
    const month = date.getUTCMonth() + 1; // getUTCMonth() returns month from 0-11
    const day = date.getUTCDate();
  
    const initialNumber = month + day;
    return reduceToSingleDigit(initialNumber);
  };
  
  export const reduceToSingleDigit = (num: number): number => {
    while (num >= 10) {
      num = num
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };
  
  
  // Function to calculate life path number using Pythagorean method
  export const calculateLifePathNumber = (dateString: string): number | null => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
  
    const digits = date.getUTCFullYear().toString().split('')
      .concat((date.getUTCMonth() + 1).toString().split(''))
      .concat(date.getUTCDate().toString().split(''))
      .map(Number);
  
    const initialNumber = digits.reduce((sum, digit) => sum + digit, 0);
    return reduceToSingleDigit(initialNumber);
  };
  
  