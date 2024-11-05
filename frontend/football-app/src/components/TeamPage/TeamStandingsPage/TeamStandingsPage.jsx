import { useState, useEffect } from "react";
import classes from "./TeamStandingsPage.module.css";
import DropdownOption from "../../DropdownOption/DropdownOption";
import { useTeamStandingsData } from "../../../hooks/useTeam/useTeamStandingsData";

export default function TeamStandingsPage({ data }) {
  const leaguesData = data[1].response;
  const availableSeasons = Array.from(
    new Set(
      leaguesData.flatMap((league) =>
        league.seasons.map((season) => season.year)
      )
    )
  ).sort((a, b) => b - a);

  const [chosenSeason, setChosenSeason] = useState(availableSeasons[0]);
  const [chosenLeague, setChosenLeague] = useState(null);

  const leaguesForChosenSeason = leaguesData.filter((league) =>
    league.seasons.some((season) => season.year === chosenSeason)
  );

  useEffect(() => {
    if (!chosenLeague && leaguesForChosenSeason.length > 0) {
      setChosenLeague(leaguesForChosenSeason[0].league);
    }
  }, [chosenLeague, leaguesForChosenSeason]);

  const {
    data: standingsData,
    isLoading,
    error,
  } = useTeamStandingsData(chosenSeason, data[0].response[0].team.id);

  if (isLoading) {
    return <div className={classes.loading}>Ładowanie...</div>;
  }

  if (error) {
    return <div className={classes.error}>Błąd: {error.message}</div>;
  }

  const selectedStandings = standingsData?.response.find(
    (league) => league.league.id === chosenLeague?.id
  );

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
            options={leaguesForChosenSeason.map((league) => league.league.name)}
            chosenOption={chosenLeague ? chosenLeague.name : ""}
            setChosenOption={(selectedLeagueName) => {
              const selectedLeague = leaguesForChosenSeason.find(
                (league) => league.league.name === selectedLeagueName
              );
              setChosenLeague(selectedLeague ? selectedLeague.league : null);
            }}
          />
        </div>
      </div>

      {selectedStandings && selectedStandings.league.standings ? (
        <div className={classes.standingsSection}>
          <h2>
            {selectedStandings.league.name} - {chosenSeason}
          </h2>
          <div className={classes.standingsTable}>
            <div className={classes.helpBar}>
              <span>Pos.</span>
              <span>Drużyna</span>
              <span>GF</span>
              <span>GA</span>
              <span>+/-</span>
              <span>Forma</span>
              <span>Rozgrywki</span>
              <span>Zwycięstwa</span>
              <span>Remisy</span>
              <span>Przegrane</span>
              <span>Punkty</span>
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
        <p>Brak danych o klasyfikacji dla tego sezonu i ligi.</p>
      )}
    </div>
  );
}
