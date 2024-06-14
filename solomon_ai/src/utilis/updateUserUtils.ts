const monthNames: { [key: string]: number } = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
};

export const parseDateString = (dateString: string): string | null => {
  if (!dateString) {
    console.log("parseDateString received an invalid dateString:", dateString);
    return null;
  }

  console.log("Parsing date string:", dateString);

  const datePatterns = [
    /\b(\d{1,2})(?:st|nd|rd|th)? day of (\w+) in the year (\d{4})\b/i,
    /\b(\w+)\s(\d{1,2})(?:st|nd|rd|th)?,?\s(\d{4})\b/i,
    /\b(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})\b/i,
  ];

  for (const pattern of datePatterns) {
    const match = dateString.match(pattern);
    if (match) {
      console.log("Matched pattern:", pattern);
      console.log("Match groups:", match);

      let day: number;
      let month: number;
      let year: number;

      if (pattern === datePatterns[0]) {
        day = parseInt(match[1]);
        month = monthNames[match[2]];
        year = parseInt(match[3]);

        if (month !== undefined) {
          const isoDate = new Date(Date.UTC(year, month, day)).toISOString();
          console.log("Parsed ISO date:", isoDate);
          return isoDate;
        } else {
          console.log("Invalid month name:", match[2]);
        }
      } else if (pattern === datePatterns[1]) {
        day = parseInt(match[2]);
        month = monthNames[match[1]];
        year = parseInt(match[3]);

        if (month !== undefined) {
          const isoDate = new Date(Date.UTC(year, month, day)).toISOString();
          console.log("Parsed ISO date:", isoDate);
          return isoDate;
        } else {
          console.log("Invalid month name:", match[1]);
        }
      } else if (pattern === datePatterns[2]) {
        day = parseInt(match[1]);
        month = parseInt(match[2]) - 1;
        year = match[3].length === 2 ? parseInt(`20${match[3]}`) : parseInt(match[3]);

        const isoDate = new Date(Date.UTC(year, month, day)).toISOString();
        console.log("Parsed ISO date:", isoDate);
        return isoDate;
      }
    } else {
      console.log("No match for pattern:", pattern);
    }
  }

  console.log("No patterns matched. Returning null.");
  return null;
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
  export const calculateEnnealogyNumber = (dateString: string): number | null => {
    if (!dateString) {
      console.log("Invalid dateString received:", dateString);
      return null;
    }
  
    const date = new Date(dateString);
    console.log("Logging the Date object:", date);
    console.log("Logging the dateString:", dateString);
  
    if (isNaN(date.getTime())) {
      console.log("Invalid date parsed:", dateString);
      return null;
    }
  
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
  
    const initialNumber = month + day;
    console.log("Initial number (month + day):", initialNumber);
  
    const ennealogyNumber = reduceToSingleDigit(initialNumber);
    console.log("Reduced to single digit:", ennealogyNumber);
  
    return ennealogyNumber;
  };
  
  export const calculateLifePathNumber = (dateString: string): number | null => {
    if (!dateString) {
      console.log("Invalid dateString received:", dateString);
      return null;
    }
  
    const date = new Date(dateString);
    console.log("Logging the Date object in calculateLifePathNumber:", date);
  
    if (isNaN(date.getTime())) {
      console.log("Invalid date parsed:", dateString);
      return null;
    }
  
    const digits = date.getUTCFullYear().toString().split('')
      .concat((date.getUTCMonth() + 1).toString().split(''))
      .concat(date.getUTCDate().toString().split(''))
      .map(Number);
  
    console.log("Digits from date:", digits);
  
    const initialNumber = digits.reduce((sum, digit) => sum + digit, 0);
    console.log("Initial number (sum of digits):", initialNumber);
  
    const lifePathNumber = reduceToSingleDigit(initialNumber);
    console.log("Reduced to single digit:", lifePathNumber);
  
    return lifePathNumber;
  };
  