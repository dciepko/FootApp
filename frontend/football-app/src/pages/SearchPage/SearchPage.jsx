import { useState, useEffect } from "react";
import { useSearchTeamAndLeagueData } from "../../hooks/useSearch/useSearchTeamAndLeagueData";
import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./SearchPage.module.css";
import noResultsIcon from "../../assets/Search_unhappy.png";
import searchIcon from "../../assets/Search_happy.png";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

export default function SearchPage() {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 300);
    return () => clearTimeout(handler);
  }, [input]);

  const { data: searchResults, isLoading } =
    useSearchTeamAndLeagueData(debouncedInput);

  const hasResults =
    searchResults &&
    searchResults.some(
      (result) => result && result.response && result.response.length > 0
    );

  const showInitialIcon = input.trim() === "" && !isLoading;

  return (
    <main>
      <NavMenu />
      <div className={classes.mainSection}>
        <div className={classes.searchContainer}>
          <input
            className={classes.searchInput}
            type="search"
            placeholder="Search for a league or a team..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className={classes.resultsContent}>
          {isLoading ? (
            <Loader />
          ) : showInitialIcon ? (
            <div className={classes.noResultsContainer}>
              <div className={classes.imageContainer}>
                <img src={searchIcon} alt="Search icon" />
              </div>
              <div className={classes.noResults}>
                Start typing to search for a league or a team
              </div>
            </div>
          ) : hasResults ? (
            <div>
              {searchResults.map((result, index) => (
                <div key={index}>
                  <ul className={classes.searchResultsList}>
                    {result.response.map((item) => (
                      <Link
                        className="disablingLinks"
                        to={
                          index === 0
                            ? `/team/${item.team.id}`
                            : `/league/${item.league.id}`
                        }
                      >
                        <li
                          className={classes.searchResult}
                          key={index === 0 ? item.team.id : item.league.id}
                        >
                          <span>
                            {index === 0 ? item.team.name : item.league.name}
                          </span>
                          <span className={classes.searchResultInfo}>
                            {index === 0 ? "Team" : "League"}
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            {index === 0
                              ? item.team.country
                              : item.country.name}
                          </span>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className={classes.noResultsContainer}>
              <div className={classes.imageContainer}>
                <img src={noResultsIcon} alt="No results icon" />
              </div>
              <div className={classes.noResults}>No results found</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
