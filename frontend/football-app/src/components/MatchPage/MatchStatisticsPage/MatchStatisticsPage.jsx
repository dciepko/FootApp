import classes from "./MatchStatisticsPage.module.css";
import fixtureData from "../../../data/fixture.json";

export default function MatchStatisticsPage() {
  const matchData = fixtureData[0];

  return (
    <div className={classes.matchStats}>
      <div className={classes.nameContainer}>
        <span>{matchData.teams.home.name}</span>
        <span>{matchData.teams.away.name}</span>
      </div>

      <div className={classes.evenStatContainer}>
        <span>{matchData.statistics[0].statistics[0].value}</span>
        <span>{matchData.statistics[0].statistics[0].type}</span>
        <span>{matchData.statistics[1].statistics[0].value}</span>
      </div>
      <div className={classes.statContainer}>
        <span>{matchData.statistics[0].statistics[1].value}</span>
        <span>{matchData.statistics[0].statistics[1].type}</span>
        <span>{matchData.statistics[1].statistics[1].value}</span>
      </div>
      <div className={classes.evenStatContainer}>
        <span>{matchData.statistics[0].statistics[2].value}</span>
        <span>{matchData.statistics[0].statistics[2].type}</span>
        <span>{matchData.statistics[1].statistics[2].value}</span>
      </div>
      <div className={classes.statContainer}>
        <span>{matchData.statistics[0].statistics[3].value}</span>
        <span>{matchData.statistics[0].statistics[3].type}</span>
        <span>{matchData.statistics[1].statistics[3].value}</span>
      </div>
      <div className={classes.evenStatContainer}>
        <span>{matchData.statistics[0].statistics[4].value}</span>
        <span>{matchData.statistics[0].statistics[4].type}</span>
        <span>{matchData.statistics[1].statistics[4].value}</span>
      </div>
      <div className={classes.statContainer}>
        <span>{matchData.statistics[0].statistics[5].value}</span>
        <span>{matchData.statistics[0].statistics[5].type}</span>
        <span>{matchData.statistics[1].statistics[5].value}</span>
      </div>
      <div className={classes.evenStatContainer}>
        <span>{matchData.statistics[0].statistics[6].value}</span>
        <span>{matchData.statistics[0].statistics[6].type}</span>
        <span>{matchData.statistics[1].statistics[6].value}</span>
      </div>
      <div className={classes.statContainer}>
        <span>{matchData.statistics[0].statistics[7].value}</span>
        <span>{matchData.statistics[0].statistics[7].type}</span>
        <span>{matchData.statistics[1].statistics[7].value}</span>
      </div>
      <div className={classes.evenStatContainer}>
        <span>{matchData.statistics[0].statistics[8].value}</span>
        <span>{matchData.statistics[0].statistics[8].type}</span>
        <span>{matchData.statistics[1].statistics[8].value}</span>
      </div>
      <div className={classes.statContainer}>
        <span>{matchData.statistics[0].statistics[9].value}</span>
        <span>{matchData.statistics[0].statistics[9].type}</span>
        <span>{matchData.statistics[1].statistics[9].value}</span>
      </div>
      <div className={classes.evenStatContainer}>
        <span>{matchData.statistics[0].statistics[10].value}</span>
        <span>{matchData.statistics[0].statistics[10].type}</span>
        <span>{matchData.statistics[1].statistics[10].value}</span>
      </div>
      <div className={classes.statContainer}>
        <span>{matchData.statistics[0].statistics[11].value}</span>
        <span>{matchData.statistics[0].statistics[11].type}</span>
        <span>{matchData.statistics[1].statistics[11].value}</span>
      </div>
      <div className={classes.evenStatContainer}>
        <span>{matchData.statistics[0].statistics[12].value}</span>
        <span>{matchData.statistics[0].statistics[12].type}</span>
        <span>{matchData.statistics[1].statistics[12].value}</span>
      </div>
      <div className={classes.statContainer}>
        <span>{matchData.statistics[0].statistics[13].value}</span>
        <span>{matchData.statistics[0].statistics[13].type}</span>
        <span>{matchData.statistics[1].statistics[13].value}</span>
      </div>
      <div className={classes.evenStatContainer}>
        <span>{matchData.statistics[0].statistics[14].value}</span>
        <span>{matchData.statistics[0].statistics[14].type}</span>
        <span>{matchData.statistics[1].statistics[14].value}</span>
      </div>
      <div className={classes.statContainer}>
        <span>{matchData.statistics[0].statistics[15].value}</span>
        <span>{matchData.statistics[0].statistics[15].type}</span>
        <span>{matchData.statistics[1].statistics[15].value}</span>
      </div>
    </div>
  );
}
