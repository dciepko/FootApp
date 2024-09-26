import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./LeaguesPage.module.css";
import leagues from "../../data/leagues.json";
import { useState } from "react";

export default function LeaguesPage() {
  const [countryShowdown, setCountryShowdown] = useState(false);
  const [seasonShowdown, setSeasonShowdown] = useState(false);
  const [typeShowdown, setTypeShowdown] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Aktualna strona
  const itemsPerPage = 100; // Elementy na stronę

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

  const renderPaginationButtons = () => {
    const paginationButtons = [];

    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${classes.paginationButton} ${
            currentPage === i ? classes.activePage : ""
          }`}
        >
          {i}
        </button>
      );
    }

    // Elipsy przed bieżącą stroną (jeśli jest dalej niż na 4. stronie)
    if (currentPage > 4) {
      paginationButtons.push(<span key="dots-prev">...</span>);
    }

    if (currentPage > 3 && currentPage < totalPages - 2) {
      if (currentPage - 1 > 3) {
        paginationButtons.push(
          <button
            key={currentPage - 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`${classes.paginationButton}`}
          >
            {currentPage - 1}
          </button>
        );
      }

      paginationButtons.push(
        <button
          key={currentPage}
          onClick={() => handlePageChange(currentPage)}
          className={`${classes.paginationButton} ${classes.activePage}`}
        >
          {currentPage}
        </button>
      );

      if (currentPage + 1 < totalPages - 2) {
        paginationButtons.push(
          <button
            key={currentPage + 1}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`${classes.paginationButton}`}
          >
            {currentPage + 1}
          </button>
        );
      }
    }

    if (currentPage < totalPages - 3) {
      paginationButtons.push(<span key="dots-next">...</span>);
    }

    for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${classes.paginationButton} ${
            currentPage === i ? classes.activePage : ""
          }`}
        >
          {i}
        </button>
      );
    }

    return paginationButtons;
  };

  return (
    <main>
      <NavMenu />
      <section className={classes.mainSection}>
        <div className={classes.optionsContainer}>
          {/* Filtry */}
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

        <div className={classes.paginationContainer}>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={classes.paginationButton}
          >
            &lt; Poprzednia
          </button>

          {renderPaginationButtons()}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={classes.paginationButton}
          >
            Następna &gt;
          </button>
        </div>
      </section>
    </main>
  );
}
