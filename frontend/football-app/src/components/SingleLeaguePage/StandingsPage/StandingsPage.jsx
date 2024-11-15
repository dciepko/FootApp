import classes from "./StandingsPage.module.css";
import Standings from "../Standing/Standings";
import { Link } from "react-router-dom";

export default function StandingsPage({ data }) {
  const premierLeague = data.response[0];
  console.log(data);

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
              <Link className="disablingLinks" to={`/team/${place.team.id}`}>
                <Standings key={place.team.id} team={place} />{" "}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
