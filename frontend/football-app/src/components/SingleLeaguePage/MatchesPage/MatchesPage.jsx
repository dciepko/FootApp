import { useState } from "react";
import classes from "./MatchesPage.module.css";
import matchesData from "../../../data/PLMatches.json";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export default function StandingsPage({ id, season }) {
  const [showFinished, setShowFinished] = useState(true);

  const finishedMatches = matchesData
    .filter((match) => match.fixture.status.short === "FT")
    .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date));

  const upcomingMatches = matchesData
    .filter((match) => match.fixture.status.short !== "FT")
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
                <div key={match.fixture.id} className={classes.singleMatch}>
                  <span>{match.teams.home.name}</span>
                  <span>{match.goals.home ? match.goals.home : "-"}</span>
                  <span> &nbsp;:&nbsp;</span>
                  <span>{match.goals.away ? match.goals.away : "-"}</span>
                  <span>{match.teams.away.name}</span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </>
  );
}
