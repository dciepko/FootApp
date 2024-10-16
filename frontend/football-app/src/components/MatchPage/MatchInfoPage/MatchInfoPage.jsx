import classes from "./MatchInfoPage.module.css";
import fixtureData from "../../../data/fixture.json";

export default function MatchInfoPage() {
  const matchData = fixtureData[0];
  return (
    <div className={classes.matchInfo}>
      <div className={classes.leagueInfo}>
        <span>{matchData.league.name}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
        <span>
          {matchData.league.season.toString().slice(2) +
            "/" +
            (
              Number(matchData.league.season.toString().slice(2)) + 1
            ).toString()}
        </span>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <span>{matchData.league.round}</span> &nbsp;&nbsp;|&nbsp;&nbsp;
        <span>{new Date(matchData.fixture.date).toLocaleString()}</span>
      </div>

      <div className={classes.teams}>
        <div className={classes.team}>
          <img
            src={matchData.teams.home.logo}
            alt={matchData.teams.home.name}
          />
          <p>{matchData.teams.home.name}</p>
        </div>
        <div className={classes.score}>
          <p>
            <strong>Minutes Elapsed:</strong> {matchData.fixture.status.elapsed}{" "}
            minutes
          </p>
          <p>
            <strong>Status:</strong> {matchData.fixture.status.long}
          </p>
          <p>
            {matchData.goals.home} - {matchData.goals.away}
          </p>
        </div>
        <div className={classes.team}>
          <img
            src={matchData.teams.away.logo}
            alt={matchData.teams.away.name}
          />
          <p>{matchData.teams.away.name}</p>
        </div>
      </div>

      <div className={classes.details}>
        <p>
          <strong>Venue:</strong> {matchData.fixture.venue.name},
          {matchData.fixture.venue.city}
        </p>
        <p>
          <strong>Referee:</strong> {matchData.fixture.referee}
        </p>
      </div>
    </div>
  );
}
