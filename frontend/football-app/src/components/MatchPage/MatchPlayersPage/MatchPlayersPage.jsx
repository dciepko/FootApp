import classes from "./MatchPlayersPage.module.css";
import fixturesData from "../../../data/fixture.json";

export default function MatchPlayersPage() {
  const matchData = fixturesData[0];
  const playersData = matchData.lineups;

  const renderContent = (teamLineup) => {
    return (
      <div className={classes.teamPlayers}>
        <h2>{teamLineup.team.name}</h2>
        <p>Formation:&nbsp;{teamLineup.formation}</p>
        <p>Starting XI:</p>
        {teamLineup.startXI.map((player) => {
          return <li>{player.player.name}</li>;
        })}
        <p>Substitutes:&nbsp;</p>
        {teamLineup.substitutes.map((player) => {
          return <li>{player.player.name}</li>;
        })}
        <p>Coach:&nbsp;</p>
        {teamLineup.coach.name}
      </div>
    );
  };

  return (
    <div className={classes.playersPage}>
      {renderContent(playersData[0])}
      {renderContent(playersData[1])}
    </div>
  );
}
