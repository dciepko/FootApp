import classes from "./TeamSquadPage.module.css";
import { Link } from "react-router-dom";
import { useTeamSquadData } from "../../../hooks/useTeam/useTeamSquadData";

export default function TeamSquadPage({ id }) {
  const { data: teamData, isLoading, error } = useTeamSquadData(id);

  // Obsługa ładowania
  if (isLoading) {
    return <div>Ładowanie danych składu zespołu...</div>;
  }

  // Obsługa błędów
  if (error) {
    return <div>Błąd wczytywania danych składu: {error.message}</div>;
  }

  // Sprawdzenie, czy dane zespołu są dostępne
  if (!teamData || !teamData.response || teamData.response.length === 0) {
    return <div>Brak danych o składzie zespołu.</div>;
  }

  const teamSquad = teamData.response[0].players;

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
          <Link
            key={player.id}
            className="disablingLinks"
            to={`/player/${player.id}`}
          >
            <div key={player.id} className={classes.singlePlayer}>
              <span>{player.number}</span>
              <div className={classes.imageContainer}>
                <img src={player.photo} alt={player.name} />
              </div>
              <span>{player.name}</span>
              <span>{player.age}&nbsp;Yrs</span>
            </div>
          </Link>
        ))}
      </div>

      <div className={classes.positionGroup}>
        <div className={classes.positionName}>
          <h2>Defenders</h2>
        </div>
        {defenders.map((player) => (
          <Link
            key={player.id}
            className="disablingLinks"
            to={`/player/${player.id}`}
          >
            <div key={player.id} className={classes.singlePlayer}>
              <span>{player.number}</span>
              <div className={classes.imageContainer}>
                <img src={player.photo} alt={player.name} />
              </div>
              <span>{player.name}</span>
              <span>{player.age}&nbsp;Yrs</span>
            </div>
          </Link>
        ))}
      </div>

      <div className={classes.positionGroup}>
        <div className={classes.positionName}>
          <h2>Midfielders</h2>
        </div>
        {midfielders.map((player) => (
          <Link
            key={player.id}
            className="disablingLinks"
            to={`/player/${player.id}`}
          >
            <div key={player.id} className={classes.singlePlayer}>
              <span>{player.number}</span>
              <div className={classes.imageContainer}>
                <img src={player.photo} alt={player.name} />
              </div>
              <span>{player.name}</span>
              <span>{player.age}&nbsp;Yrs</span>
            </div>
          </Link>
        ))}
      </div>

      <div className={classes.positionGroup}>
        <div className={classes.positionName}>
          <h2>Attackers</h2>
        </div>
        {attackers.map((player) => (
          <Link
            key={player.id}
            className="disablingLinks"
            to={`/player/${player.id}`}
          >
            <div className={classes.singlePlayer}>
              <span>{player.number}</span>
              <div className={classes.imageContainer}>
                <img src={player.photo} alt={player.name} />
              </div>
              <span>{player.name}</span>
              <span>{player.age}&nbsp;Yrs</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
