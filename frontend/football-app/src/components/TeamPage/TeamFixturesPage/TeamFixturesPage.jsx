import { useEffect, useState } from "react";
import classes from "./TeamFixturesPage.module.css";
import DropdownOption from "../../DropdownOption/DropdownOption";
import { Link } from "react-router-dom";
import { useTeamFixturesData } from "../../../hooks/useTeam/useTeamFixturesData";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export default function TeamFixturesPage({ data }) {
  const leaguesData = data[1]?.response || [];
  const availableSeasons = Array.from(
    new Set(
      leaguesData.flatMap((league) =>
        league.seasons.map((season) => season.year)
      )
    )
  ).sort((a, b) => b - a);

  const [chosenSeason, setChosenSeason] = useState(availableSeasons[0]);
  const [chosenLeague, setChosenLeague] = useState(null);
  const [showFinished, setShowFinished] = useState(true);

  const leaguesForChosenSeason = leaguesData.filter((league) =>
    league.seasons.some((season) => season.year === chosenSeason)
  );

  useEffect(() => {
    if (!chosenLeague && leaguesForChosenSeason.length > 0) {
      setChosenLeague(leaguesForChosenSeason[0].league);
    }
  }, [chosenLeague, leaguesForChosenSeason]);

  const {
    data: fixturesData,
    isLoading,
    error,
  } = useTeamFixturesData(chosenSeason, data[0]?.response[0]?.team.id);

  if (isLoading) {
    return <div className={classes.loading}>Ładowanie...</div>;
  }

  if (error) {
    return <div className={classes.error}>Błąd: {error.message}</div>;
  }

  const allFixtures = fixturesData?.response || [];
  const finishedMatches = allFixtures
    .filter(
      (fixture) =>
        fixture.league.id === chosenLeague?.id &&
        fixture.fixture.status.short === "FT"
    )
    .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date));

  const upcomingMatches = allFixtures
    .filter(
      (fixture) =>
        fixture.league.id === chosenLeague?.id &&
        fixture.fixture.status.short !== "FT" &&
        new Date(fixture.fixture.date) > new Date()
    )
    .sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));

  const matchesToDisplay = showFinished ? finishedMatches : upcomingMatches;

  const groupedMatches = matchesToDisplay.reduce((groups, match) => {
    const matchDate = formatDate(match.fixture.date);
    if (!groups[matchDate]) {
      groups[matchDate] = [];
    }
    groups[matchDate].push(match);
    return groups;
  }, {});

  const formatSeasonLabel = (season) => {
    return (
      season.toString().slice(2) +
      " / " +
      (Number(season.toString().slice(2)) + 1).toString()
    );
  };

  return (
    <div className={classes.fixturesPage}>
      <div className={classes.choosePart}>
        <div className={classes.chooseSection}>
          <DropdownOption
            options={availableSeasons}
            chosenOption={chosenSeason}
            setChosenOption={setChosenSeason}
            labelFormatter={formatSeasonLabel}
          />

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

      <div className={classes.toggleContainer}>
        <button
          className={showFinished ? classes.activeButton : classes.button}
          onClick={() => setShowFinished(true)}
        >
          <span>Finished matches</span>
        </button>
        <button
          className={!showFinished ? classes.activeButton : classes.button}
          onClick={() => setShowFinished(false)}
          disabled={upcomingMatches.length === 0}
        >
          <span>Upcoming matches</span>
        </button>
      </div>

      <div className={classes.fixturesSection}>
        {Object.keys(groupedMatches).length === 0 ? (
          <div className={classes.noMatches}>No matches to show.</div>
        ) : (
          Object.keys(groupedMatches).map((date) => (
            <div key={date}>
              <div className={classes.dateHeader}>{date}</div>
              {groupedMatches[date].map((match) => (
                <Link
                  key={match.fixture.id}
                  className="disablingLinks"
                  to={`/match/${match.fixture.id}`}
                >
                  <div className={classes.singleMatch}>
                    <span>{match.teams.home.name}</span>
                    <span>
                      {match.goals.home !== null ? match.goals.home : "-"}
                    </span>
                    <span> &nbsp;:&nbsp;</span>
                    <span>
                      {match.goals.away !== null ? match.goals.away : "-"}
                    </span>
                    <span>{match.teams.away.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
