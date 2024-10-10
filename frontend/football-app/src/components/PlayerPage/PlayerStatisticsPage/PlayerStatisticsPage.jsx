import { useState } from "react";
import classes from "./PlayerStatisticsPage.module.css";
import seasons from "../../../data/player/haalandSeasons.json";
import playerinfo from "../../../data/player/haaland.json";
import DropdownOption from "../../DropdownOption/DropdownOption";

export default function PlayerStatisticsPage() {
  const seasonsData = seasons;
  const competitionsData = playerinfo[0].statistics.map(
    (stat) => stat.league.name
  );

  const [chosenSeason, setChosenSeason] = useState(
    seasonsData[seasonsData.length - 1]
  );
  const [chosenCompetition, setChosenCompetition] = useState(
    competitionsData[0]
  );

  const formatSeasonLabel = (season) => {
    return (
      season.toString().slice(2) +
      " / " +
      (Number(season.toString().slice(2)) + 1).toString()
    );
  };

  return (
    <>
      <div className={classes.chooseSection}>
        <div className={classes.seasonChoosePart}>
          <DropdownOption
            options={seasonsData}
            chosenOption={chosenSeason}
            setChosenOption={setChosenSeason}
            labelFormatter={formatSeasonLabel}
          />
        </div>
        <div className={classes.competitionChoosePart}>
          <DropdownOption
            options={competitionsData}
            chosenOption={chosenCompetition}
            setChosenOption={setChosenCompetition}
          />
        </div>
      </div>

      <div className={classes.statisticsSection}></div>
    </>
  );
}
