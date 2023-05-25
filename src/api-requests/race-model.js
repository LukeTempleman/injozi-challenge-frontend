import React, { useEffect, useState } from 'react';

export const dataParser = (result) => {
    let raceModel = {
        "season": "",
        "raceAmount": 0,
        "races": []
    }
 
        raceModel.season = result.MRData.RaceTable.season
        raceModel.raceAmount =  result.MRData.total
        let raceTable = result.MRData.RaceTable

        for (let i = 0; i < raceModel.raceAmount; i++){
            raceModel.races.push(
                {
                "round": raceTable.Races[i].round,
                "name": raceTable.Races[i].raceName,
                "date": raceTable.Races[i].date,
                "driver": raceTable.Races[i].Results[0].Driver.familyName,
                }
            )
        }

    return(raceModel)
}