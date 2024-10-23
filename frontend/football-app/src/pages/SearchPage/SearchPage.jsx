import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./SearchPage.module.css";
import noResultsIcon from "../../assets/sad.png";

export default function SearchPage() {
  const searchResults = "";
  return (
    <main>
      <NavMenu />
      <div className={classes.mainSection}>
        <div className={classes.searchContainer}>
          <input
            className={classes.searchInput}
            type="search"
            placeholder="Search..."
          />
        </div>

        <div className={classes.resultsContent}>
          {searchResults ? (
            searchResults
          ) : (
            <div className={classes.noResultsContainer}>
              <div className={classes.imageContainer}>
                <img src={noResultsIcon} alt="No reults icon" />
              </div>
              <div className={classes.noResults}>No results found</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
