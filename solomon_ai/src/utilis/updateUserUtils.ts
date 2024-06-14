
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
  
  



  // Handling getting the personal Year Numbers 
export const calculatePersonalYearNumber = (dateString: string): number | null =>
{ 

  const date = new Date(dateString);


  console.log("Logging the dat string", dateString)
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  // Extract month, day, and year
  const month = date.getUTCMonth() + 1; // getUTCMonth() returns 0-11, so we add 1
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  console.log("Logging the month", month)
  console.log("Logging the day", day)





  // Sum the digits of the month and day
  let monthDaySum = reduceToSingleDigit(month) + reduceToSingleDigit(day);

  monthDaySum = reduceToSingleDigit(monthDaySum)
  console.log("Logging the monthDaySum", monthDaySum)

  // Sum the digits of the year
  currentYear = reduceToSingleDigit(currentYear)
  console.log("Logging the current year", currentYear)



  // Final calculation
  const finalSum = reduceToSingleDigit(monthDaySum + currentYear);


  if (finalSum) { 
    return finalSum
  }else {
    return null
  }


}

export const getPersonalMonth = (personalYear: number): number => {
  const now = new Date();
  const month = now.getMonth() + 1;

  // Mapping months to the specific values mentioned
  const monthValues = {
    1: 1, // January
    2: 2, // February
    3: 3, // March
    4: 4, // April
    5: 5, // May
    6: 6, // June
    7: 7, // July
    8: 8, // August
    9: 9, // September
    10: 1, // October
    11: 2, // November
    12: 3, // December
  };

  const currentMonthValue = monthValues[month];
  let personalMonth = (personalYear + currentMonthValue) % 9;

  // Adjust if the personal month calculation results in 0
  return personalMonth === 0 ? 9 : personalMonth;
};

// Function to calculate the personal month for a given month index
export const calculatePersonalMonthForIndex = (personalYear: number, monthIndex: number): number => {
  const monthValue = (personalYear + monthIndex - 1) % 9;
  return monthValue === 0 ? 9 : monthValue;
};

// Function to get all personal months and the current month
export const getAllPersonalMonths = (personalYear: number) => {
  const months = [
    "Personal Destiny",
    "Personal Year",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const personalMonths = months.map((month, index) => {
    if (index < 2) {
      return month; // Keep "Personal Destiny" and "Personal Year" as they are
    }
    const monthValue = calculatePersonalMonthForIndex(personalYear, index);
    return `${month} (${monthValue})`;
  });

  const currentPersonalMonth = calculatePersonalMonthForIndex(personalYear, currentMonth);

  return {
    personalMonths,
    currentMonth,
    currentPersonalMonth,
  };
};
