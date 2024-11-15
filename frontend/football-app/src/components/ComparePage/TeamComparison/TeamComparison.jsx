import React, { useState, useEffect } from "react";
import { useSearchTeamData } from "../../../hooks/useSearch/useSearchTeamData";
import { useTeamLeaguesData } from "../../../hooks/useTeam/useTeamLeagues";
import { useTeamStatisticsData } from "../../../hooks/useTeam/useTeamStatisticsData";
import TeamStatsModal from "../../TeamStatsModal/TeamStatsModal";
import classes from "./TeamComparison.module.css";

export default function TeamComparison() {
  const [containers, setContainers] = useState([{}, {}]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(searchInput);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [teamLeagues, setTeamLeagues] = useState({});
  const [teamStatistics, setTeamStatistics] = useState({});
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedLeagueId, setSelectedLeagueId] = useState(null);
  const [expandedMinutes, setExpandedMinutes] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const calculateCardTotals = (cards) => {
    const redTotal = Object.values(cards.red).reduce(
      (sum, period) => sum + (period.total || 0),
      0
    );
    const yellowTotal = Object.values(cards.yellow).reduce(
      (sum, period) => sum + (period.total || 0),
      0
    );
    return { redTotal, yellowTotal };
  };

  const formatStatName = (name) => {
    return name.toUpperCase().replace(/_/g, " ");
  };

  const renderStats = (stats) => {
    if (!stats || typeof stats !== "object") {
      return <p>No statistics available.</p>;
    }

    const excludedCategories = ["team", "lineups", "league", "form"];
    const statElements = [];

    const renderNestedCategory = (categoryData) => {
      return Object.entries(categoryData).map(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          return (
            <div key={key}>
              <h5>{formatStatName(key)}</h5>
              {renderNestedCategory(value)}
            </div>
          );
        }
        return (
          <p key={key}>
            {key}: {value !== null ? value : "N/A"}
          </p>
        );
      });
    };

    for (const category in stats) {
      if (excludedCategories.includes(category)) continue;

      const categoryData = stats[category];

      if (
        category === "cards" &&
        categoryData &&
        typeof categoryData === "object"
      ) {
        const { redTotal, yellowTotal } = calculateCardTotals(categoryData);
        statElements.push(
          <div key="cards">
            <h4>{formatStatName("cards")}</h4>
            <p>Red Cards: {redTotal}</p>
            <p>Yellow Cards: {yellowTotal}</p>
          </div>
        );
      } else if (
        category === "minutes" &&
        categoryData &&
        typeof categoryData === "object"
      ) {
        statElements.push(
          <div key={category}>
            <h4 onClick={() => setExpandedMinutes(!expandedMinutes)}>
              {formatStatName(category)} {expandedMinutes ? "D" : "Z"}
            </h4>
            {expandedMinutes && <div>{renderNestedCategory(categoryData)}</div>}
          </div>
        );
      } else if (categoryData && typeof categoryData === "object") {
        statElements.push(
          <div key={category}>
            <h4>{formatStatName(category)}</h4>
            <div>{renderNestedCategory(categoryData)}</div>
          </div>
        );
      } else {
        statElements.push(
          <p key={category}>
            {formatStatName(category)}:{" "}
            {categoryData !== null ? categoryData : "N/A"}
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
