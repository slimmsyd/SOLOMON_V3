
const monthNames: { [key: string]: number } = {
  January: 0, Jan: 0, February: 1, Feb: 1, March: 2, Mar: 2, April: 3, Apr: 3, May: 4, June: 5, Jun: 5,
  July: 6, Jul: 6, August: 7, Aug: 7, September: 8, Sept: 8, Sep: 8, October: 9, Oct: 9, November: 10, Nov: 10, December: 11, Dec: 11
};
export const parseDateString = (dateString: string): string | null => {

  if (!dateString) {
    return new Date().toISOString();  // Return current date as fallback
  }

  const datePatterns = [
    /\b(\d{1,2})(?:st|nd|rd|th)? day of (\w+) in the year (\d{4})\b/i, // e.g., "1st day of September in the year 2000"
    /\b(\w+)\s(\d{1,2})(?:st|nd|rd|th)?,?\s(\d{4})\b/i, // e.g., "September 1st, 2000"
    /\b(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})\b/i, // e.g., "01/09/2000", "01-09-2000", "01.09.2000"
  ];

  for (const pattern of datePatterns) {
    const match = dateString.match(pattern);

    if (match) {
 
      if (pattern === datePatterns[0]) {
        const day = parseInt(match[1]);
        const month = monthNames[match[2].charAt(0).toUpperCase() + match[2].slice(1).toLowerCase()]; // Normalize month name
        const year = parseInt(match[3]);
   

        if (month !== undefined) {
          const isoDate = new Date(Date.UTC(year, month, day)).toISOString();
          return isoDate;
        } else {
        }
      } else if (pattern === datePatterns[1]) {
        const day = parseInt(match[2]);
        const month = monthNames[match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase()]; // Normalize month name
        const year = parseInt(match[3]);
  
        if (month !== undefined) {
          const isoDate = new Date(Date.UTC(year, month, day)).toISOString();
          return isoDate;
        } else {
          console.error("Invalid month name:", match[1]);
        }
      } else if (pattern === datePatterns[2]) {
        const day = parseInt(match[1]);
        const month = parseInt(match[2]) - 1; // Convert to zero-based month index
        const year = match[3].length === 2 ? parseInt(`20${match[3]}`) : parseInt(match[3]);
      

        const isoDate = new Date(Date.UTC(year, month, day)).toISOString();
        console.log("Parsed ISO date:", isoDate);
        return isoDate;
      }

    } else {
    }
  }

  console.error("No patterns matched. Returning null.");
  return null;
};


  export const calculateEnnealogyNumber = (dateString: string): number | null => {
    if (!dateString) {
      console.log("parseDateString received an invalid dateString:", dateString);
      return null;
    }
  
    

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
    
      if (!dateString) {
      return null;
    }
  
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
  
    const digits = date.getUTCFullYear().toString().split('')
      .concat((date.getUTCMonth() + 1).toString().split(''))
      .concat(date.getUTCDate().toString().split(''))
      .map(Number);
  
    const initialNumber = digits.reduce((sum, digit) => sum + digit, 0);
    return reduceToSingleDigit(initialNumber);
  };
  
  