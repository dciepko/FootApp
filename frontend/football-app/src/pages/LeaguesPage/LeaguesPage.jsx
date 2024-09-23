import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./LeaguesPage.module.css";
import leagues from "../../data/leagues.json";
import { useState } from "react";

export default function LeaguesPage() {
  const [countryShowdown, setCountryShowdown] = useState(false);
  const [seasonShowdown, setSeasonShowdown] = useState(false);
  const [typeShowdown, setTypeShowdown] = useState(false);

  const countrySet = [...new Set(leagues.map((league) => league.country.name))];
  const seasonSet = [...new Set(leagues.map((league) => league.seasons.year))];
  const typeSet = [...new Set(leagues.map((league) => league.league.type))];

  return (
    <main>
      <NavMenu />
      <section className={classes.mainSection}>
        <div className={classes.optionsContainer}>
          <div className={classes.optionContainer}>
            <button
              onClick={() => {
                setCountryShowdown(!countryShowdown);
              }}
              className={classes.optionButton}
            >
              Kraj
            </button>
            {countryShowdown && (
              <ul className={classes.optionMenu}>
                {countrySet.map((country) => {
                  return <li>{country}</li>;
                })}
              </ul>
            )}
          </div>
          <div className={classes.optionContainer}>
            <button
              onClick={() => {
                setSeasonShowdown(!seasonShowdown);
              }}
              className={classes.optionButton}
            >
              Sezon
            </button>
            {seasonShowdown && (
              <ul className={classes.optionMenu}>
                {seasonSet.map((season) => {
                  return <li>{season}</li>;
                })}
              </ul>
            )}
          </div>
          <div className={classes.optionContainer}>
            <button
              onClick={() => {
                setTypeShowdown(!typeShowdown);
              }}
              className={classes.optionButton}
            >
              Typ Rozgrywek
            </button>
            {typeShowdown && (
              <ul className={classes.optionMenu}>
                {typeSet.map((type) => {
                  return <li>{type}</li>;
                })}
              </ul>
            )}
          </div>
        </div>
        <div className={classes.leaguesContainer}>
          {leagues &&
            leagues.map((league) => {
              return (
                <li className={classes.leagueBar}>
                  <span className={classes.logoContainer}>
                    <img
                      className={classes.leagueLogoImage}
                      src={league.league.logo}
                      alt={league.league.name}
                    />
                  </span>
                  <span className={classes.nameContainer}>
                    {league.league.name}
                  </span>
                  <span className={classes.typeContainer}>
                    {league.league.type}
                  </span>
                  <span className={classes.flagContainer}>
                    <img
                      className={classes.leagueFlagImage}
                      src={league.country.flag}
                      alt={league.country.name}
                    />
                  </span>
                </li>
              );
            })}
        </div>
      </section>
    </main>
  );
}
