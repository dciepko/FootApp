import { useState } from "react";
import classes from "./MatchesPage.module.css";
import { useLeagueFixturesData } from "../../../hooks/useLeague/useLeagueFixturesData";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export default function MatchesPage({ id, season }) {
  const [showFinished, setShowFinished] = useState(true);

  const {
    data: fixturesData,
    isLoading,
    error,
  } = useLeagueFixturesData(id, season);

  if (isLoading) return <Loader />;
  if (error) return <div>Błąd wczytywania danych: {error.message}</div>;

  if (
    !fixturesData ||
    !fixturesData.response ||
    fixturesData.response.length === 0
  ) {
    return <div>Brak danych o meczach.</div>;
  }

  const finishedMatches = fixturesData.response
    .filter((match) => match.fixture.status.short === "FT")
    .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date));

  const upcomingMatches = fixturesData.response
    .filter(
      (match) =>
        match.fixture.status.short !== "FT" &&
        new Date(match.fixture.date) > new Date()
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

  return (
    <>
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
          <span>Ongoing matches</span>
        </button>
      </div>

      <div className={classes.matches}>
        {Object.keys(groupedMatches).length === 0 ? (
          <div className={classes.noMatches}>No matches to show.</div>
        ) : (
          Object.keys(groupedMatches).map((date) => (
            <div key={date}>
              <div className={classes.dateHeader}>{date}</div>
              {groupedMatches[date].map((match) => (
                <Link
                  className="disablingLinks"
                  to={`/match/${match.fixture.id}`}
                >
                  <div key={match.fixture.id} className={classes.singleMatch}>
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
    </>
  );
}
