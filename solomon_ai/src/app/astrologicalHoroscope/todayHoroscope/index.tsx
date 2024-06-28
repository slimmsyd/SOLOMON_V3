import React,  {useEffect, useState, FC} from 'react'
import Image from 'next/image';
import VirgoImage from '../../../../public/assets/zodiacIcons/virgopng.png'
import arrowLeft from '../../../../public/assets/Chat/arrowLeft.png'



interface Horoscope { 
    zodiacSign: string;
}


export const TodaysContainer: FC<Horoscope> = ({
    zodiacSign
  }) => {

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
            Going your own way? As you change. so will the people you
            resonate with. Aries last quarter turns the page. <br />
            Friendships thrive on mutal support. Assess who you nurture and
            who nurtures you. If theres not an even exchange, some
            boundaries may need to be set.
          </p>
       
        </div>
      </div>
    )
    

    }

