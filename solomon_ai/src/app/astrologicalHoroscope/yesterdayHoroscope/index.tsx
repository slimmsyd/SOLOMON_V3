import React,  {useEffect, useState, FC} from 'react'
import Image from 'next/image';
import VirgoImage from '../../../../public/assets/zodiacIcons/virgopng.png'
import arrowLeft from '../../../../public/assets/Chat/arrowLeft.png'




interface Horoscope { 
  zodiacSign: string;
  period: string;
}




export const YesterdayContainer: FC<Horoscope> = ({
    zodiacSign,
    period
  }) => {

    const [horoscope, setHoroscope] = useState(null);
    const [error, setError] = useState(null);
  


    useEffect(() => {
      console.log("Logging in the container", zodiacSign)
      const fetchHoroscope = async (zodiacSign) => {
        const url = `https://horoscope-daily-api.p.rapidapi.com/horoscope/${period}?sign=${zodiacSign}`;
  
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '992fcc9ef2mshb8d3038e15f69ecp144a29jsnb7bd0bcedd63',
            'x-rapidapi-host': 'horoscope-daily-api.p.rapidapi.com'
          }
        };
  
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          setHoroscope(data);
        } catch (error) {
          setError(error);
          console.error('Error fetching horoscope:', error);
        }
      };
  
      fetchHoroscope(zodiacSign.toLowerCase());
    }, [zodiacSign]);


    useEffect(() => { 


    },[horoscope])
  


    return ( 
        <div className="flex md:flex-row flex-col gap-[15px] rounded-[10px] md:gap-[0px border-[0.5px] border-[#737373] justify-between accountDiv">
        <div className="flex flex-col gap-[15px]">
          <div className="zodiacWrapper">
            <Image
              width={32}
              height={32}
              src={VirgoImage}
              alt="Virgo Zodiac Sign"
            />
          </div>
          <p className="text-white">Sun Sign: {zodiacSign}</p>
          <p className="text-[14px] text-white">
          {horoscope}
          </p>
      
        </div>
      </div>
    )
    

    }

