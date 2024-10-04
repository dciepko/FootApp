import classes from "./StandingsPage.module.css";
import premierLeagueData from "../../../data/currentLeague/premierLeague.json";

export default function StandingsPage() {
  const premierLeague = premierLeagueData[0];

  return (
    <>
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
    </>
  );
}
