import React, { useEffect, useState } from "react";

/**
 * Will parse the Json data provided and construct a readable model
 * only containing the data we need
 * 
 * eg: round, raceName, date
 * 
 * @param {*} result 
 * @returns raceModel
 */
export const dataParser = (result) => {
  let raceModel = {
    season: "",
    raceAmount: 0,
    races: [],
    winner: "",
  };

  raceModel.season = result.MRData.RaceTable.season;
  raceModel.raceAmount = result.MRData.total;
  let raceTable = result.MRData.RaceTable;

  for (let i = 0; i < raceModel.raceAmount; i++) {
    raceModel.races.push({
      round: raceTable.Races[i].round,
      name: raceTable.Races[i].raceName,
      date: raceTable.Races[i].date,
      driver: raceTable.Races[i].Results[0].Driver.familyName,
    });
  }

  return raceModel;
};

/**
 * Started working on this function to collect the yearly champions
 * and construct a model based off the Json data we parse
 * 
 * @param {*} result 
 * @returns raceModel
 */
export const championParser = (result) => {
  let raceModel = {
    name: "",
    year: "",
  };

  raceModel.year = result.MRData.StandingsTable.season;
  raceModel.name =
    result.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.familyName;

  return raceModel;
};
