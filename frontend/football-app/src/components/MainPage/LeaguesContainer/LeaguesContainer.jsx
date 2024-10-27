import classes from "./LeaguesContainer.module.css";
import leagues from "../../../data/leagues.json";
import { useState } from "react";
import premierLeagueData from "../../../data/currentLeague/premierLeague.json";
import laLigaData from "../../../data/currentLeague/laLiga.json";
import bundesligaData from "../../../data/currentLeague/bundesliga.json";
import serieAData from "../../../data/currentLeague/serieA.json";
import ligueUnData from "../../../data/currentLeague/ligueUn.json";
import ekstraklasaData from "../../../data/currentLeague/ekstraklasa.json";
import LeaguesContainerPlaceBar from "../LeaguesContainerPlaceBar/LeaguesContainerPlaceBar";
import { Link } from "react-router-dom";

export default function LeaguesContainer() {
  //   const premierLeague = leagues.find((obj) => obj.league.id === 39);
  //   const laLiga = leagues.find((obj) => obj.league.id === 140);
  //   const bundesliga = leagues.find((obj) => obj.league.id === 78);
  //   const serieA = leagues.find((obj) => obj.league.id === 135);
  //   const ligueUn = leagues.find((obj) => obj.league.id === 61);
  //   const ekstraklasa = leagues.find((obj) => obj.league.id === 106);

  const premierLeague = premierLeagueData[0];
  const laLiga = laLigaData[0];
  const bundesliga = bundesligaData[0];
  const serieA = serieAData[0];
  const ligueUn = ligueUnData[0];
  const ekstraklasa = ekstraklasaData[0];

  const [currentLeague, setCurrentLeague] = useState(premierLeague);

  return (
    <div className={classes.leaguesList}>
      <div className={classes.leagueChoosePanel}>
        <button
          className={classes.leagueButton}
          onClick={() => {
            setCurrentLeague(premierLeague);
          }}
        >
          <img
            className={classes.leagueImage}
            src={premierLeague.league.logo}
            alt="Premier League"
          />
        </button>
        <button
          className={classes.leagueButton}
          onClick={() => {
            setCurrentLeague(laLiga);
          }}
        >
          <img
            className={classes.leagueImage}
            src={laLiga.league.logo}
            alt="La Liga"
          />
        </button>
        <button
          className={classes.leagueButton}
          onClick={() => {
            setCurrentLeague(bundesliga);
          }}
        >
          <img
            className={classes.leagueImage}
            src={bundesliga.league.logo}
            alt="Bundesliga"
          />
        </button>
        <button
          className={classes.leagueButton}
          onClick={() => {
            setCurrentLeague(serieA);
          }}
        >
          <img
            className={classes.leagueImage}
            src={serieA.league.logo}
            alt="Serie A"
          />
        </button>
        <button
          className={classes.leagueButton}
          onClick={() => {
            setCurrentLeague(ligueUn);
          }}
        >
          <img
            className={classes.leagueImage}
            src={ligueUn.league.logo}
            alt="Ligue 1"
          />
        </button>
        <button
          className={classes.leagueButton}
          onClick={() => {
            setCurrentLeague(ekstraklasa);
          }}
        >
          <img
            className={classes.leagueImage}
            src={ekstraklasa.league.logo}
            alt="Ekstraklasa"
          />
        </button>
      </div>
      <div className={classes.leagueContainer}>
        <div className={classes.helpBar}>
          <span>Pos.</span>
          <span>Team</span>
          <span>+/-</span>
          <span>Pts.</span>
        </div>
        {currentLeague &&
          currentLeague.league.standings[0].map((place) => {
            return (
              <Link className="disablingLinks" to={"/team"}>
                <LeaguesContainerPlaceBar place={place} />
              </Link>
            );
          })}
      </div>
    </div>
  );
}
