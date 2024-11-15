import React, { useState, useEffect } from "react";
import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./LIVEPage.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import { useFixturesLiveData } from "../../hooks/useFixturesLiveData";

export default function LIVEPage() {
  const { data: fixturesData, isLoading, error } = useFixturesLiveData();
  const [displayedFixtures, setDisplayedFixtures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [leagueShowdown, setLeagueShowdown] = useState(false);
  const [countryShowdown, setCountryShowdown] = useState(false);

  useEffect(() => {
    if (fixturesData && Array.isArray(fixturesData.response)) {
      setDisplayedFixtures(fixturesData.response);
    }
  }, [fixturesData]);

  if (isLoading) return <div>Ładowanie meczów...</div>;
  if (error) return <div>Błąd: {error.message}</div>;

  const leagueSet = [
    ...new Set(displayedFixtures.map((fixture) => fixture.league.name)),
  ];
  const countrySet = [
    ...new Set(displayedFixtures.map((fixture) => fixture.league.country)),
  ];

  const filteredFixtures = displayedFixtures.filter((fixture) => {
    const matchesLeague =
      selectedLeagues.length === 0 ||
      selectedLeagues.includes(fixture.league.name);
    const matchesCountry =
      selectedCountries.length === 0 ||
      selectedCountries.includes(fixture.league.country);
    return matchesLeague && matchesCountry;
  });

  const totalPages = Math.ceil(filteredFixtures.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFixtures = filteredFixtures.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const toggleFilter = (type, value) => {
    if (type === "league") {
      setSelectedLeagues((prev) =>
        prev.includes(value)
          ? prev.filter((league) => league !== value)
          : [...prev, value]
      );
      setLeagueShowdown(false);
    } else if (type === "country") {
      setSelectedCountries((prev) =>
        prev.includes(value)
          ? prev.filter((country) => country !== value)
          : [...prev, value]
      );
      setCountryShowdown(false);
    }
  };
  const clearFilter = (type, value) => {
    if (type === "league") {
      setSelectedLeagues((prev) => prev.filter((league) => league !== value));
    } else if (type === "country") {
      setSelectedCountries((prev) =>
        prev.filter((country) => country !== value)
      );
    }
  };

  return (
    <main>
      <NavMenu />
      <section className={classes.mainSection}>
        <div className={classes.appliedFilters}>
          {selectedLeagues.map((league) => (
            <div key={league} className={classes.filterTag}>
              {league}
              <button
                onClick={() => clearFilter("league", league)}
                className={classes.clearButton}
              >
                X
              </button>
            </div>
          ))}
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
        </div>

        <div className={classes.optionsContainer}>
          <div className={classes.optionContainer}>
            <button
              onClick={() => setLeagueShowdown(!leagueShowdown)}
              className={classes.optionButton}
            >
              <span>League</span>
            </button>
            {leagueShowdown && (
              <ul className={classes.optionMenu}>
                {leagueSet.map((league) => (
                  <li
                    key={league}
                    onClick={() => toggleFilter("league", league)}
                  >
                    {league}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={classes.optionContainer}>
            <button
              onClick={() => setCountryShowdown(!countryShowdown)}
              className={classes.optionButton}
            >
              <span>Country</span>
            </button>
            {countryShowdown && (
              <ul className={classes.optionMenu}>
                {countrySet.map((country) => (
                  <li
                    key={country}
                    onClick={() => toggleFilter("country", country)}
                  >
                    {country}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={classes.fixturesContainer}>
          {currentFixtures.map((fixture) => (
            <Link
              className="disablingLinks"
              to={`/match/${fixture.fixture.id}`}
              key={fixture.fixture.id}
            >
              <li className={classes.fixtureBar}>
                <span className={classes.logoContainer}>
                  <img
                    className={classes.teamLogoImage}
                    src={fixture.teams.home.logo}
                    alt={fixture.teams.home.name}
                  />
                </span>
                <span className={classes.nameContainer}>
                  {fixture.teams.home.name}
                </span>
                <span className={classes.statusContainer}>
                  <span className={classes.timeContainer}>
                    {fixture.fixture.status.elapsed}'
                  </span>
                  <span className={classes.resultContainer}>
                    {fixture.goals.home}&nbsp;-&nbsp;{fixture.goals.away}
                  </span>
                </span>
                <span className={classes.nameContainer}>
                  {fixture.teams.away.name}
                </span>
                <span className={classes.logoContainer}>
                  <img
                    className={classes.teamLogoImage}
                    src={fixture.teams.away.logo}
                    alt={fixture.teams.away.name}
                  />
                </span>
              </li>
            </Link>
          ))}
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
