import classes from "./StatisticsPage.module.css";
import { useLeaguesTopPlayersData } from "../../../hooks/useLeague/useLeaguesTopPlayersData";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

export default function StatisticsPage({ id, season }) {
  const {
    data: topPlayersData,
    isLoading,
    error,
  } = useLeaguesTopPlayersData(id, season);

  if (isLoading) return <Loader />;
  if (error) return <div>Błąd wczytywania danych: {error.message}</div>;

  if (!topPlayersData || topPlayersData.length < 4) {
    return <div>Brak danych o graczach.</div>;
  }

  const goalScorers = topPlayersData[0]?.response || [];
  const assists = topPlayersData[1]?.response || [];
  const redCards = topPlayersData[2]?.response || [];
  const yellowCards = topPlayersData[3]?.response || [];

  return (
    <>
      <section className={classes.goalScorersSection}>
        <div className={classes.sectionShape}>
          <div className={classes.contentSection}>
            <div className={classes.containerName}>Goals</div>
            <div className={classes.tableContainer}>
              {goalScorers.map((player, index) => (
                <Link
                  className="disablingLinks"
                  to={`/player/${player.player.id}`}
                  key={player.player.id}
                >
                  <li>
                    <span>{index + 1}.</span> <span>{player.player.name}</span>{" "}
                    <span>{player.statistics[0].goals.total}</span>
                  </li>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className={classes.assistsSection}>
        <div className={classes.sectionShape}>
          <div className={classes.contentSection}>
            <div className={classes.containerName}>Assists</div>
            <div className={classes.tableContainer}>
              {assists.map((player, index) => (
                <Link
                  className="disablingLinks"
                  to={`/player/${player.player.id}`}
                  key={player.player.id}
                >
                  <li>
                    <span>{index + 1}.</span> <span>{player.player.name}</span>{" "}
                    <span>{player.statistics[0].goals.assists}</span>
                  </li>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className={classes.yellowCardsSection}>
        <div className={classes.sectionShape}>
          <div className={classes.contentSection}>
            <div className={classes.containerName}>Yellow Cards</div>
            <div className={classes.tableContainer}>
              {yellowCards.map((player, index) => (
                <Link
                  className="disablingLinks"
                  to={`/player/${player.player.id}`}
                  key={player.player.id}
                >
                  <li>
                    <span>{index + 1}.</span> <span>{player.player.name}</span>{" "}
                    <span>{player.statistics[0].cards.yellow}</span>
                  </li>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className={classes.redCardsSection}>
        <div className={classes.sectionShape}>
          <div className={classes.contentSection}>
            <div className={classes.containerName}>Red Cards</div>
            <div className={classes.tableContainer}>
              {redCards.map((player, index) => (
                <Link
                  className="disablingLinks"
                  to={`/player/${player.player.id}`}
                  key={player.player.id}
                >
                  <li>
                    <span>{index + 1}.</span> <span>{player.player.name}</span>{" "}
                    <span>{player.statistics[0].cards.red}</span>
                  </li>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
