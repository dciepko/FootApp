import classes from "./StatisticsPage.module.css";
import goalScorersData from "../../../data/PLTopPlayers/PLGoals.json";
import assistsData from "../../../data/PLTopPlayers/PLAssists.json";
import yellowCardsData from "../../../data/PLTopPlayers/PLYellowCards.json";
import redCardsData from "../../../data/PLTopPlayers/PLRedCards.json";

export default function StatisticsPage() {
  const goalScorers = goalScorersData;
  const assists = assistsData;
  const yellowCards = yellowCardsData;
  const redCards = redCardsData;

  return (
    <>
      <section className={classes.goalScorersSection}>
        <div className={classes.sectionShape}>
          <div className={classes.contentSection}>
            <div className={classes.containerName}>Goals</div>
            <div className={classes.tableContainer}>
              {goalScorers.map((player, index) => {
                return (
                  <li key={player.player.id}>
                    <span>{index + 1}.</span> <span>{player.player.name}</span>{" "}
                    <span>{player.statistics[0].goals.total}</span>
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className={classes.assistsSection}>
        <div className={classes.sectionShape}>
          <div className={classes.contentSection}>
            <div className={classes.containerName}>Assists</div>
            <div className={classes.tableContainer}>
              {assists.map((player, index) => {
                return (
                  <li key={player.player.id}>
                    <span>{index + 1}.</span> <span>{player.player.name}</span>{" "}
                    <span>{player.statistics[0].goals.assists}</span>
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className={classes.yellowCardsSection}>
        <div className={classes.sectionShape}>
          <div className={classes.contentSection}>
            <div className={classes.containerName}>Yellow Cards</div>
            <div className={classes.tableContainer}>
              {yellowCards.map((player, index) => {
                return (
                  <li key={player.player.id}>
                    <span>{index + 1}.</span> <span>{player.player.name}</span>{" "}
                    <span>{player.statistics[0].cards.yellow}</span>
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className={classes.redCardsSection}>
        <div className={classes.sectionShape}>
          <div className={classes.contentSection}>
            <div className={classes.containerName}>Red Cards</div>
            <div className={classes.tableContainer}>
              {redCards.map((player, index) => {
                return (
                  <li key={player.player.id}>
                    <span>{index + 1}.</span> <span>{player.player.name}</span>{" "}
                    <span>{player.statistics[0].cards.red}</span>
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
