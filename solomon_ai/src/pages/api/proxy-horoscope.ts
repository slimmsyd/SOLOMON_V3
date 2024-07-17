// pages/api/proxy-horoscope.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=virgo&day=TODAY', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Error fetching horoscope: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching horoscope:', error);
    res.status(500).json({ message: 'Error fetching horoscope' });
  }
}
