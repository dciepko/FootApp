import classes from "./TeamSquadPage.module.css";
import teamSquadData from "../../../data/team/MUSquads.json";

export default function TeamSquadPage() {
  const teamSquad = teamSquadData[0].players;

  // Grupowanie zawodników na podstawie ich pozycji
  const goalkeepers = teamSquad.filter(
    (player) => player.position === "Goalkeeper"
  );
  const defenders = teamSquad.filter(
    (player) => player.position === "Defender"
  );
  const midfielders = teamSquad.filter(
    (player) => player.position === "Midfielder"
  );
  const attackers = teamSquad.filter(
    (player) => player.position === "Attacker"
  );

  return (
    <div className={classes.squad}>
      <div className={classes.positionGroup}>
        <div className={classes.positionName}>
          <h2>Goalkeepers</h2>
        </div>
        {goalkeepers.map((player) => (
          <div key={player.id} className={classes.singlePlayer}>
            <span>{player.number}</span>
            <div className={classes.imageContainer}>
              <img src={player.photo} alt={player.name} />
            </div>

            <span>{player.name}</span>
            <span>{player.age}&nbsp;Yrs</span>
          </div>
        ))}
      </div>

      <div className={classes.positionGroup}>
        <div className={classes.positionName}>
          <h2>Defenders</h2>
        </div>{" "}
        {defenders.map((player) => (
          <div key={player.id} className={classes.singlePlayer}>
            <span>{player.number}</span>
            <div className={classes.imageContainer}>
              <img src={player.photo} alt={player.name} />
            </div>{" "}
            <span>{player.name}</span>
            <span>{player.age}&nbsp;Yrs</span>
          </div>
        ))}
      </div>

      <div className={classes.positionGroup}>
        <div className={classes.positionName}>
          <h2>Midfielders</h2>
        </div>
        {midfielders.map((player) => (
          <div key={player.id} className={classes.singlePlayer}>
            <span>{player.number}</span>
            <div className={classes.imageContainer}>
              <img src={player.photo} alt={player.name} />
            </div>
            <span>{player.name}</span>
            <span>{player.age}&nbsp;Yrs</span>
          </div>
        ))}
      </div>

      <div className={classes.positionGroup}>
        <div className={classes.positionName}>
          <h2>Attackers</h2>
        </div>
        {attackers.map((player) => (
          <div key={player.id} className={classes.singlePlayer}>
            <span>{player.number}</span>
            <div className={classes.imageContainer}>
              <img src={player.photo} alt={player.name} />
            </div>{" "}
            <span>{player.name}</span>
            <span>{player.age}&nbsp;Yrs</span>
          </div>
        ))}
      </div>
    </div>
  );
}
