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
          <div className={classes.imageContainer}>
            <img
              src={matchData.teams.home.logo}
              alt={matchData.teams.home.name}
            />
          </div>
          <h3>{matchData.teams.home.name}</h3>
        </div>
        <div className={classes.score}>
          <div className={classes.status}>
            <p>{matchData.fixture.status.elapsed}'</p>&nbsp;&nbsp;
            <p>{matchData.fixture.status.short}</p>
          </div>
          <div className={classes.actualScore}>
            {matchData.goals.home} - {matchData.goals.away}
          </div>
        </div>
        <div className={classes.team}>
          <h3>{matchData.teams.away.name}</h3>
          <div className={classes.imageContainer}>
            <img
              src={matchData.teams.away.logo}
              alt={matchData.teams.away.name}
            />
          </div>
        </div>
      </div>

      <div className={classes.events}>
        {matchData.events.map((event, index) => (
          <div key={index} className={classes.eventRow}>
            {event.team.id === matchData.teams.home.id ? (
              <>
                <div className={classes.eventHome}>
                  <p>
                    <strong>{event.time.elapsed}'</strong> - {event.player.name}{" "}
                    ({event.detail})
                  </p>
                </div>
                <div className={classes.emptyEvent}></div>
              </>
            ) : (
              <>
                <div className={classes.emptyEvent}></div>
                <div className={classes.eventAway}>
                  <p>
                    <strong>{event.time.elapsed}'</strong> - {event.player.name}{" "}
                    ({event.detail})
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className={classes.details}>
        <span>
          <p className={classes.detailName}>Referee:</p>
          <p>{matchData.fixture.referee},</p>
        </span>
        <span>
          <p className={classes.detailName}>Venue:</p>
          <p>{matchData.fixture.venue.name}</p>
        </span>
        <span>
          <p className={classes.detailName}>City:</p>
          <p>{matchData.fixture.venue.city}</p>
        </span>
      </div>
    </div>
  );
}
