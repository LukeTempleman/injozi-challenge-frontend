import axios from 'axios';
import { dataParser } from './race-model';

export const getAllSeasonWinners = async () => {
  try {
    const d = new Date();
    let currentYear = d.getFullYear();
    let seasonWinners = []

    for (let i = 0; i < (currentYear-2005);i++){
        const response = await axios.get(`http://ergast.com/api/f1/${String(2005+i)}/results/1.json`);
        let currentRace = dataParser(response.data)
        seasonWinners.push(currentRace)
    }

    return seasonWinners
  } catch (error) {
    // Handle any errors
    console.error('Error fetching data:', error);
    throw error;
  }
};