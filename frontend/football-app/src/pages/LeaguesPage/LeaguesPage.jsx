import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./LeaguesPage.module.css";
import leagues from "../../data/leagues.json";
import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination";

export default function LeaguesPage() {
  const [countryShowdown, setCountryShowdown] = useState(false);
  const [seasonShowdown, setSeasonShowdown] = useState(false);
  const [typeShowdown, setTypeShowdown] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const countrySet = [...new Set(leagues.map((league) => league.country.name))];
  const seasonSet = [...new Set(leagues.map((league) => league.seasons.year))];
  const typeSet = [...new Set(leagues.map((league) => league.league.type))];

  const leaguesNumber = leagues.length;

  const filteredLeagues = leagues.filter((league) => {
    const matchesCountry =
      selectedCountries.length === 0 ||
      selectedCountries.includes(league.country.name);
    const matchesSeason =
      selectedSeasons.length === 0 ||
      selectedSeasons.includes(league.seasons.year);
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(league.league.type);
    return matchesCountry && matchesSeason && matchesType;
  });

  const totalPages = Math.ceil(filteredLeagues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLeaguesElements = filteredLeagues.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleFilter = (type, value) => {
    if (type === "country") {
      setSelectedCountries((prev) =>
        prev.includes(value)
          ? prev.filter((country) => country !== value)
          : [...prev, value]
      );
    } else if (type === "season") {
      setSelectedSeasons((prev) =>
        prev.includes(value)
          ? prev.filter((season) => season !== value)
          : [...prev, value]
      );
    } else if (type === "type") {
      setSelectedTypes((prev) =>
        prev.includes(value)
          ? prev.filter((type) => type !== value)
          : [...prev, value]
      );
    }
  };

  const clearFilter = (type, value) => {
    if (type === "country") {
      setSelectedCountries((prev) =>
        prev.filter((country) => country !== value)
      );
    } else if (type === "season") {
      setSelectedSeasons((prev) => prev.filter((season) => season !== value));
    } else if (type === "type") {
      setSelectedTypes((prev) => prev.filter((type) => type !== value));
    }
  };

  return (
    <main>
      <NavMenu />
      <section className={classes.mainSection}>
        <div className={classes.appliedFilters}>
          {selectedCountries.map((country) => (
            <div key={country} className={classes.filterTag}>
              {country}
              <button
                onClick={() => clearFilter("country", country)}
                className={classes.clearButton}
              >
                X
              </button>
            </div>
          ))}
          {selectedSeasons.map((season) => (
            <div key={season} className={classes.filterTag}>
              {season}{" "}
              <button
                onClick={() => clearFilter("season", season)}
                className={classes.clearButton}
              >
                X
              </button>
            </div>
          ))}
          {selectedTypes.map((type) => (
            <div key={type} className={classes.filterTag}>
              {type}{" "}
              <button
                onClick={() => clearFilter("type", type)}
                className={classes.clearButton}
              >
                X
              </button>
            </div>
          ))}
        </div>

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
                  return (
                    <li
                      key={country}
                      onClick={() => toggleFilter("country", country)}
                    >
                      {country}
                    </li>
                  );
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
                  return (
                    <li
                      key={season}
                      onClick={() => toggleFilter("season", season)}
                    >
                      {season}
                    </li>
                  );
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
                  return (
                    <li key={type} onClick={() => toggleFilter("type", type)}>
                      {type}
                    </li>
                  );
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
