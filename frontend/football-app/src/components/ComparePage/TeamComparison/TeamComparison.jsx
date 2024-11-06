import React, { useState, useEffect } from "react";
import { useSearchTeamData } from "../../../hooks/useSearch/useSearchTeamData";
import classes from "./TeamComparison.module.css";

export default function TeamComparison() {
  const [containers, setContainers] = useState([{}, {}]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(searchInput);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Debouncing search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(searchInput);
    }, 300); // delay 300ms
    return () => clearTimeout(handler);
  }, [searchInput]);

  // Fetching data based on debounced input
  const { data: searchResults, isLoading } = useSearchTeamData(debouncedInput);

  const addContainer = () => {
    if (containers.length < 4) {
      setContainers([...containers, {}]);
    }
  };

  const removeContainer = (index) => {
    if (containers.length > 2) {
      const updatedContainers = containers.filter((_, i) => i !== index);
      setContainers(updatedContainers);
    }
  };

  const handleSelectTeam = (team, index) => {
    const updatedContainers = containers.map((container, i) =>
      i === index ? { ...container, team } : container
    );
    setContainers(updatedContainers);
    setSelectedIndex(null);
    setSearchInput("");
  };

  return (
    <>
      {containers.map((container, index) => (
        <div key={index} className={classes.comparisonContainer}>
          <div className={classes.containerHeader}>
            <input
              className={classes.searchInput}
              type="search"
              placeholder="Search for a Team"
              value={
                selectedIndex === index
                  ? searchInput
                  : container.team?.name || ""
              }
              onChange={(e) => {
                setSearchInput(e.target.value);
                setSelectedIndex(index);
              }}
            />
            <button
              className={`${classes.removeButton} ${
                containers.length <= 2 ? classes.disabledButton : ""
              }`}
              onClick={() => removeContainer(index)}
              disabled={containers.length <= 2}
            >
              X
            </button>
          </div>
          {selectedIndex === index && searchInput && (
            <div className={classes.showdownContainer}>
              {isLoading ? (
                <div className={classes.loading}>Loading...</div>
              ) : searchResults?.response.length > 0 ? (
                <ul className={classes.resultsList}>
                  {searchResults.response.map((team) => (
                    <li
                      key={team.team.id}
                      onClick={() => handleSelectTeam(team.team, index)}
                      className={classes.resultItem}
                    >
                      {team.team.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={classes.noResults}>No results found</div>
              )}
            </div>
          )}
        </div>
      ))}
      {containers.length < 4 && (
        <div className={classes.addButtonContainer}>
          <button className={classes.addButton} onClick={addContainer}>
            +
          </button>
        </div>
      )}
    </>
  );
}
