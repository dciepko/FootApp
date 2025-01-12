import React, { useState, useEffect, useRef } from "react";
import { useSearchTeamData } from "../../../hooks/useSearch/useSearchTeamData";
import { useTeamLeaguesData } from "../../../hooks/useTeam/useTeamLeagues";
import { useTeamStatisticsData } from "../../../hooks/useTeam/useTeamStatisticsData";
import TeamStatsModal from "../../TeamStatsModal/TeamStatsModal";
import classes from "./TeamComparison.module.css";
import { initializeExtremes } from "../../../utils/ComparePages/initializeExtremes";
import { updateExtremes } from "../../../utils/ComparePages/updateExtremes";
import { calculateCardTotals } from "../../../utils/ComparePages/calculateCardTotals";
import { getNestedValue } from "../../../utils/ComparePages/getNestedValue";

export default function TeamComparison() {
  const [containers, setContainers] = useState([{}, {}]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(searchInput);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [teamLeagues, setTeamLeagues] = useState({});
  const [teamStatistics, setTeamStatistics] = useState({});
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedLeagueId, setSelectedLeagueId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const maxValues = useRef({});
  const minValues = useRef({});

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(searchInput);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const {
    data: searchResults,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
  } = useSearchTeamData(debouncedInput);

  const {
    data: leaguesData,
    isLoading: isLoadingLeagues,
    isError: isErrorLeagues,
  } = useTeamLeaguesData(selectedTeamId);

  useEffect(() => {
    if (leaguesData && leaguesData.response.length > 0) {
      const leagueId = leaguesData.response[0].league.id;
      setTeamLeagues((prev) => ({ ...prev, [selectedTeamId]: leaguesData }));
      setSelectedLeagueId(leagueId);
    }
  }, [leaguesData, selectedTeamId]);

  const {
    data: statisticsData,
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = useTeamStatisticsData(selectedLeagueId, 2023, selectedTeamId);

  useEffect(() => {
    if (statisticsData) {
      setTeamStatistics((prev) => ({
        ...prev,
        [selectedTeamId]: {
          data: statisticsData.response,
          isLoadingStats,
          isErrorStats,
        },
      }));
      if (statisticsData) {
        if (Object.keys(maxValues.current) === null) {
          console.log("To wogole kurwa weszlo?");
          initializeExtremes(statisticsData.response, [
            "team",
            "lineups",
            "league",
            "form",
          ]);
        } else {
          console.log("To wogole kurwa weszlo? 2");
          console.log(maxValues.current);
          updateExtremes(statisticsData.response, maxValues, minValues, [
            "team",
            "lineups",
            "league",
            "form",
          ]);
        }
      }
    }
  }, [statisticsData, selectedTeamId]);

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
    setSelectedTeamId(team.id);
  };

  const handleClearTeam = (index) => {
    const updatedContainers = containers.map((container, i) =>
      i === index ? {} : container
    );
    setContainers(updatedContainers);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isModalEnabled =
    containers.filter((container) => container.team).length >= 2;

  const formatStatName = (name) => {
    return name.toUpperCase().replace(/_/g, " ");
  };

  const renderStatWithHighlight = (path, value, key) => {
    if (typeof value !== "number") return value;
    console.log(value);
    const maxValue = getNestedValue(maxValues.current, path);
    const minValue = getNestedValue(minValues.current, path);
    console.log(maxValue);

    const isMax = value === maxValue;
    const isMin = value === minValue;

    let className = "";
    if (isMax) className = classes.highlightMax;
    if (isMin) className = classes.highlightMin;
    if (isMin && isMax) className = "";

    return (
      <p key={key} className={className}>
        {key}:&nbsp;<span>{value}</span>
      </p>
    );
  };

  const renderStats = (stats) => {
    if (!stats || typeof stats !== "object") {
      return <p>No statistics available.</p>;
    }

    const excludedCategories = ["team", "lineups", "league", "form"];
    const statElements = [];

    for (const category in stats) {
      if (excludedCategories.includes(category)) continue;

      const categoryData = stats[category];

      const renderNestedCategory = (categoryData, path = []) => {
        return Object.entries(categoryData).map(([key, value]) => {
          const currentPath = [...path, key];

          if (typeof value === "object" && value !== null) {
            return (
              <div key={key}>
                <h5>{formatStatName(key)}</h5>
                {renderNestedCategory(value, currentPath)}
              </div>
            );
          }
          return (
            <>
              {renderStatWithHighlight(
                currentPath,
                value,
                key,
                classes,
                maxValues,
                minValues
              )}
            </>
          );
        });
      };

      if (
        category === "cards" &&
        categoryData &&
        typeof categoryData === "object"
      ) {
        const { redTotal, yellowTotal } = calculateCardTotals(categoryData);
        statElements.push(
          <div key="cards">
            <h4>{formatStatName("cards")}</h4>
            <p>
              Red Cards:{" "}
              {renderStatWithHighlight(["cards", "redTotal"], redTotal)}
            </p>
            <p>
              Yellow Cards:{" "}
              {renderStatWithHighlight(["cards", "yellowTotal"], yellowTotal)}
            </p>
          </div>
        );
      } else if (typeof categoryData === "object" && categoryData !== null) {
        statElements.push(
          <div key={category}>
            <h4>{formatStatName(category)}</h4>
            {renderNestedCategory(categoryData, [category])}
          </div>
        );
      } else {
        statElements.push(
          <p key={category}>
            {formatStatName(category)}:{" "}
            {renderStatWithHighlight([category], categoryData)}
          </p>
        );
      }
    }

    return statElements;
  };

  return (
    <>
      <div className={classes.withoutButton}>
        {containers.map((container, index) => (
          <div key={index} className={classes.comparisonContainer}>
            <div className={classes.containerHeader}>
              {container.team ? (
                <div className={classes.selectedTeam}>
                  {container.team.name}
                  <button
                    className={classes.clearButton}
                    onClick={() => handleClearTeam(index)}
                  >
                    X
                  </button>
                </div>
              ) : (
                <input
                  className={classes.searchInput}
                  type="search"
                  placeholder="Search for a Team"
                  value={selectedIndex === index ? searchInput : ""}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setSelectedIndex(index);
                  }}
                />
              )}
              {containers.length > 2 && (
                <button
                  className={`${classes.removeButton} ${
                    containers.length <= 2 ? classes.disabledButton : ""
                  }`}
                  onClick={() => removeContainer(index)}
                  disabled={containers.length <= 2}
                >
                  X
                </button>
              )}
            </div>

            {selectedIndex === index && searchInput && (
              <div className={classes.showdownContainer}>
                {isLoadingSearch ? (
                  <div className={classes.loading}>Loading...</div>
                ) : isErrorSearch ? (
                  <div className={classes.error}>Error loading data.</div>
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

            {container.team && teamStatistics[container.team.id] && (
              <div className={classes.statisticsContainer}>
                {teamStatistics[container.team.id].isLoadingStats ? (
                  <div className={classes.loading}>Loading statistics...</div>
                ) : teamStatistics[container.team.id].isErrorStats ? (
                  <div className={classes.error}>Error loading statistics.</div>
                ) : teamStatistics[container.team.id].data ? (
                  <>{renderStats(teamStatistics[container.team.id].data)} </>
                ) : (
                  <div className={classes.noResults}>
                    No statistics available.
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {isModalOpen && (
          <TeamStatsModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            containers={containers}
            teamStatistics={teamStatistics}
          />
        )}

        {containers.length < 4 && (
          <div className={classes.addButtonContainer}>
            <button className={classes.addButton} onClick={addContainer}>
              +
            </button>
          </div>
        )}
      </div>
      {isModalEnabled && (
        <div className={classes.openModalButtonContainer}>
          <button onClick={handleOpenModal} className={classes.openModalButton}>
            Display charts
          </button>
        </div>
      )}
    </>
  );
}
