import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./LeaguesPage.module.css";
import leagues from "../../data/leagues.json";
import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination"; // Import nowego komponentu

export default function LeaguesPage() {
  const [countryShowdown, setCountryShowdown] = useState(false);
  const [seasonShowdown, setSeasonShowdown] = useState(false);
  const [typeShowdown, setTypeShowdown] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  const countrySet = [...new Set(leagues.map((league) => league.country.name))];
  const seasonSet = [...new Set(leagues.map((league) => league.seasons.year))];
  const typeSet = [...new Set(leagues.map((league) => league.league.type))];

  const leaguesNumber = leagues.length;
  const totalPages = Math.ceil(leaguesNumber / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentLeaguesElements = leagues.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
              <span>Kraj</span>
            </button>
            {countryShowdown && (
              <ul className={classes.optionMenu}>
                {countrySet.map((country) => {
                  return <li key={country}>{country}</li>;
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
              <span>Sezon</span>
            </button>
            {seasonShowdown && (
              <ul className={classes.optionMenu}>
                {seasonSet.map((season) => {
                  return <li key={season}>{season}</li>;
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
              <span>Typ Rozgrywek</span>
            </button>
            {typeShowdown && (
              <ul className={classes.optionMenu}>
                {typeSet.map((type) => {
                  return <li key={type}>{type}</li>;
                })}
              </ul>
            )}
          </div>
        </div>

        <div className={classes.leaguesContainer}>
          {currentLeaguesElements.map((league) => {
            return (
              <li key={league.league.id} className={classes.leagueBar}>
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

        {/* Wstawienie komponentu Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
        />
      </section>
    </main>
  );
}
