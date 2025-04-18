import { Link } from "react-router-dom";
import classes from "./SearchPlayerPage.module.css";
import noResultsIcon from "../../../assets/Search_unhappy.png";
import searchIcon from "../../../assets/Search_happy.png";
import { useEffect, useState } from "react";
import { useSearchPlayerData } from "../../../hooks/useSearch/useSearchPlayerData";
import Loader from "../../Loader/Loader";

export default function SearchPlayerPage({ id }) {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 300);
    return () => clearTimeout(handler);
  }, [input]);

  const { data: searchResults, isLoading } = useSearchPlayerData(
    "league",
    id,
    debouncedInput
  );

  const hasResults = searchResults && searchResults.length > 0;
  const showInitialIcon = input.trim() === "" && !isLoading;

  return (
    <div className={classes.mainSection}>
      <div className={classes.searchContainer}>
        <input
          className={classes.searchInput}
          type="search"
          placeholder="Search..."
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
              Start typing to search for a player.
            </div>
          </div>
        ) : hasResults ? (
          <div>
            {searchResults.map((result, index) => (
              <div key={index}>
                <ul className={classes.searchResultsList}>
                  <Link
                    className="disablingLinks"
                    to={`/player/${result.player.id}`}
                  >
                    <li className={classes.searchResult} key={result.player.id}>
                      {result.player.name}
                    </li>
                  </Link>
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
  );
}
