import classes from "./StandingsPage.module.css";
import Standings from "../Standing/Standings";
import { Link } from "react-router-dom";

export default function StandingsPage({ data }) {
  const leagueData = data.response[0];
  let leagueType;

  if (leagueData.league.standings.length > 1) {
    leagueType = "world";
  } else {
    leagueType = "noWorld";
  }

  console.log(leagueType);

  return (
    <>
      {leagueType === "noWorld" ? (
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
            {leagueData.league.standings[0].map((place) => {
              return (
                <div className={classes.singleStanding}>
                  <Link
                    className="disablingLinks"
                    to={`/team/${place.team.id}`}
                  >
                    <Standings key={place.team.id} team={place} />{" "}
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        leagueData.league.standings.map((group) => {
          return (
            <>
              <div className={classes.groupName}>{group[0].group}</div>
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
                {group.map((place) => {
                  return (
                    <div className={classes.singleStanding}>
                      <Link
                        className="disablingLinks"
                        to={`/team/${place.team.id}`}
                      >
                        <Standings key={place.team.id} team={place} />{" "}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })
      )}
    </>
  );
}
