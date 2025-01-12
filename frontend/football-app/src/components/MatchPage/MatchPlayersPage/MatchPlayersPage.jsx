import classes from "./MatchPlayersPage.module.css";
import Field from "../../Field/Field";
import { Link } from "react-router-dom";

export default function MatchPlayersPage({ data }) {
  const matchData = data;
  const playersData = matchData.lineups;

  const renderContent = (teamLineup) => {
    return (
      <div className={classes.oneTeamContainer}>
        <h2>{teamLineup.team.name}</h2>

        <Field team={teamLineup} />
        <div className={classes.teamPlayers}>
          <p className={classes.toBold}>
            Formation:&nbsp;{teamLineup.formation}
          </p>
          <p className={classes.toBold}>Starting XI:</p>
          {teamLineup.startXI.map((player) => {
            return (
              <Link
                className="disablingLinks"
                to={`/player/${player.player.id}`}
              >
                <li>{player.player.name}</li>
              </Link>
            );
          })}
          <p className={classes.toBold}>Substitutes:&nbsp;</p>
          {teamLineup.substitutes.map((player) => {
            return (
              <Link
                className="disablingLinks"
                to={`/player/${player.player.id}`}
              >
                <li>{player.player.name}</li>
              </Link>
            );
          })}
          <p className={classes.toBold}>Coach:&nbsp;</p>
          {teamLineup.coach.name}
        </div>
      </div>
    );
  };

  return (
    <div className={classes.playersPage}>
      {playersData && playersData.length > 0 ? (
        <>
          {renderContent(playersData[0])}
          {renderContent(playersData[1])}
        </>
      ) : (
        <div>Brak danych</div>
      )}
    </div>
  );
}
