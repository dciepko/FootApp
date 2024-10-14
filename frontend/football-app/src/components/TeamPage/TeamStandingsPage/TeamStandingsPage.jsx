import { useState } from "react";
import classes from "./TeamStandingsPage.module.css";
import standingsData from "../../../data/team/MUStandings.json"; // przykładowa ścieżka do danych standings
import seasonsData from "../../../data/team/MUSeasons.json";
import DropdownOption from "../../DropdownOption/DropdownOption";

export default function TeamStandingsPage() {
  const availableSeasons = seasonsData;
  // Początkowy wybór ligi i sezonu
  const [chosenLeague, setChosenLeague] = useState(standingsData[0].league.id);
  const [chosenSeason, setChosenSeason] = useState(
    standingsData[0].league.season
  );

  // Wyciągnięcie dostępnych lig
  const leagues = standingsData.map((data) => ({
    id: data.league.id,
    name: data.league.name,
  }));

  // Wyciągnięcie dostępnych sezonów dla wybranej ligi

  // Wybranie danych dla wybranej ligi i sezonu
  const selectedStandings = standingsData.find(
    (data) =>
      data.league.id === chosenLeague && data.league.season === chosenSeason
  );

  // Formatowanie etykiety sezonu np. "20 / 21"
  const formatSeasonLabel = (season) => {
    return (
      season.toString().slice(2) +
      " / " +
      (Number(season.toString().slice(2)) + 1).toString()
    );
  };

  return (
    <div className={classes.standingsPage}>
      <div className={classes.choosePart}>
        <div className={classes.chooseSection}>
          <DropdownOption
            options={availableSeasons}
            chosenOption={chosenSeason}
            setChosenOption={setChosenSeason}
            labelFormatter={formatSeasonLabel}
          />
        </div>
        <div className={classes.chooseSection}>
          <DropdownOption
            options={leagues.map((league) => league.id)}
            chosenOption={chosenLeague}
            setChosenOption={setChosenLeague}
            labelFormatter={(leagueId) =>
              leagues.find((league) => league.id === leagueId).name
            }
          />
        </div>
      </div>

      {selectedStandings ? (
        <div className={classes.standingsSection}>
          <h2>
            {selectedStandings.league.name} - {chosenSeason}
          </h2>
          <div className={classes.standingsTable}>
            <div className={classes.helpBar}>
              <span>Pos.</span>
              <span>Team</span>
              <span>GF</span>
              <span>GA</span>
              <span>+/-</span>
              <span>Form</span>
              <span>Played</span>
              <span>Win</span>
              <span>Draw</span>
              <span>Lose</span>
              <span>Points</span>
            </div>

            {selectedStandings.league.standings[0].map((teamStanding) => (
              <div className={classes.standing} key={teamStanding.team.id}>
                <span>{teamStanding.rank}</span>
                <span>{teamStanding.team.name}</span>
                <span>{teamStanding.all.goals.for}</span>
                <span>{teamStanding.all.goals.against}</span>
                <span>{teamStanding.goalsDiff}</span>
                <span>{teamStanding.form}</span>
                <span>{teamStanding.all.played}</span>
                <span>{teamStanding.all.win}</span>
                <span>{teamStanding.all.draw}</span>
                <span>{teamStanding.all.lose}</span>
                <span>{teamStanding.points}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No standings available for this season and league.</p>
      )}
    </div>
  );
}
