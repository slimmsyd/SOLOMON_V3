


export const calculateTimeLeft = () => {
    const targetDate = new Date('2024-09-08T14:30:00-05:00'); // EST is UTC-5:00
    const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
  
      let timeLeft = {
        hours: '00',
        minutes: '00',
        seconds: '00',
      };
  
      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
  
        timeLeft = {
          hours: hours < 10 ? `0${hours}` : `${hours}`,
          minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
          seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
        };
      }
  
      return timeLeft;
    };
  
  