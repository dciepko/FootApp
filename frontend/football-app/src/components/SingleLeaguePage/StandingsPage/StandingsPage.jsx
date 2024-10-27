import classes from "./StandingsPage.module.css";
import premierLeagueData from "../../../data/currentLeague/premierLeague.json";
import Standings from "../Standing/Standings";

export default function StandingsPage() {
  const premierLeague = premierLeagueData[0];

  return (
    <>
      <div className={classes.helpBar}>
        <span style={{ paddingLeft: "1.4rem" }}>Pos.</span>
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
      <div className={classes.actualStandings}>
        {premierLeague.league.standings[0].map((place) => {
          return (
            <div className={classes.singleStanding}>
              <Standings team={place} />{" "}
            </div>
          );
        })}
      </div>
    </>
  );
}
