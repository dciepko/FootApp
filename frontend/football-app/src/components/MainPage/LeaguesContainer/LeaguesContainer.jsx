import classes from "./LeaguesContainer.module.css";
import leagues from "../../../data/leagues.json";

export default function LeaguesContainer() {
  const premierLeague = leagues.find((obj) => obj.league.id === 39);
  const laLiga = leagues.find((obj) => obj.league.id === 140);
  const bundesliga = leagues.find((obj) => obj.league.id === 78);
  const serieA = leagues.find((obj) => obj.league.id === 135);
  const ligueUn = leagues.find((obj) => obj.league.id === 61);
  const ekstraklasa = leagues.find((obj) => obj.league.id === 106);

  return (
    <div className={classes.leaguesList}>
      <div className={classes.leagueChoosePanel}>
        <button className={classes.leagueButton}>
          <img
            className={classes.leagueImage}
            src={premierLeague.league.logo}
            alt="Premier League"
          />
        </button>
        <button className={classes.leagueButton}>
          <img
            className={classes.leagueImage}
            src={laLiga.league.logo}
            alt="La Liga"
          />
        </button>
        <button className={classes.leagueButton}>
          <img
            className={classes.leagueImage}
            src={bundesliga.league.logo}
            alt="Bundesliga"
          />
        </button>
        <button className={classes.leagueButton}>
          <img
            className={classes.leagueImage}
            src={serieA.league.logo}
            alt="Serie A"
          />
        </button>
        <button className={classes.leagueButton}>
          <img
            className={classes.leagueImage}
            src={ligueUn.league.logo}
            alt="Ligue 1"
          />
        </button>
        <button className={classes.leagueButton}>
          <img
            className={classes.leagueImage}
            src={ekstraklasa.league.logo}
            alt="Ekstraklasa"
          />
        </button>
      </div>
      <div className={classes.leagueContainer}></div>
    </div>
  );
}
