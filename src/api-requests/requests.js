import axios from "axios";
import { dataParser, championParser } from "./race-model";

/**
 * This is where we make our api requests to collect the needed data
 * we then parse the data and return it to our main page to display
 * 
 * @returns seasonalWinners
 */
export const getAllSeasonWinners = async () => {
  try {
    const d = new Date();
    let currentYear = d.getFullYear();
    let seasonWinners = [];
    let seasonChampion = [];

    for (let i = 0; i < currentYear - 2005; i++) {
      const response = await axios.get(
        `http://ergast.com/api/f1/${String(2005 + i)}/results/1.json`
      );
      const championResponse = await axios.get(
        `http://ergast.com/api/f1/${String(2005 + i)}/driverStandings.json`
      );

      let currentRace = dataParser(response.data);
      let currentChampion = championParser(championResponse.data);
      seasonWinners.push(currentRace);
      seasonChampion.push(currentChampion);
    }

    return [seasonWinners, seasonChampion];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
