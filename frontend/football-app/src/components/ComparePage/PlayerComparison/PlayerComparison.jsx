import React, { useState, useEffect } from "react";
import PlayerStatsModal from "../../PlayerStatsModal/PlayerStatsModal";
import classes from "./PlayerComparison.module.css";
import { useSearchTeamAndLeagueData } from "../../../hooks/useSearch/useSearchTeamLeagueCountryData";
import { useSearchPlayerData } from "../../../hooks/useSearch/useSearchPlayerData";

export default function PlayerComparison() {
  const [containers, setContainers] = useState([{}, {}]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(searchInput);
  const [playerSearchInputs, setPlayerSearchInputs] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedEntityType, setSelectedEntityType] = useState(null);
  const [selectedEntityId, setSelectedEntityId] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState({});
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
  } = useSearchTeamAndLeagueData(debouncedInput);

  const {
    data: playerResults,
    isLoading: isLoadingPlayers,
    isError: isErrorPlayers,
  } = useSearchPlayerData(
    selectedEntityType,
    selectedEntityId,
    playerSearchInputs[selectedIndex]
  );

  const addContainer = () => {
    if (containers.length < 4) {
      setContainers([...containers, {}]);
      setPlayerSearchInputs([...playerSearchInputs, ""]);
    }
  };

  const removeContainer = (index) => {
    if (containers.length > 2) {
      const updatedContainers = containers.filter((_, i) => i !== index);
      const updatedPlayerSearchInputs = playerSearchInputs.filter(
        (_, i) => i !== index
      );
      setContainers(updatedContainers);
      setPlayerSearchInputs(updatedPlayerSearchInputs);
    }
  };

  const handleSelectEntity = (entity, index) => {
    const updatedContainers = containers.map((container, i) =>
      i === index ? { ...container, entity } : container
    );
    setContainers(updatedContainers);
    setSearchInput("");

    let entityId = null;
    if (entity.team) {
      entityId = entity.team.id;
      setSelectedEntityType("team");
    } else if (entity.league) {
      entityId = entity.league.id;
      setSelectedEntityType("league");
    } else if (entity.id) {
      entityId = entity.id;
      setSelectedEntityType("country");
    }

    setSelectedEntityId(entityId);
    setPlayerSearchInputs((prev) =>
      prev.map((input, i) => (i === index ? "" : input))
    );
  };

  const handleClearEntity = (index) => {
    const updatedContainers = containers.map((container, i) =>
      i === index ? {} : container
    );
    const updatedPlayerSearchInputs = playerSearchInputs.map((input, i) =>
      i === index ? "" : input
    );
    setContainers(updatedContainers);
    setPlayerSearchInputs(updatedPlayerSearchInputs);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isModalEnabled =
    containers.filter((container) => container.entity).length >= 2;

  const updatePlayerSearchInput = (value, index) => {
    setPlayerSearchInputs((prev) => {
      const updatedInputs = [...prev];
      updatedInputs[index] = value;
      return updatedInputs;
    });
  };

  const handleSelectPlayer = (player, index) => {
    const updatedContainers = containers.map((container, i) =>
      i === index ? { ...container, player } : container
    );
    setContainers(updatedContainers);
    setPlayerSearchInputs((prev) =>
      prev.map((input, i) => (i === index ? "" : input))
    );
    setSelectedPlayer(player);
    setSelectedIndex(null); // Reset selectedIndex to close showdown
  };

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

    const excludedCategories = ["team", "league"];
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
            {formatStatName(category)}:
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
              {container.entity ? (
                <div className={classes.selectedEntity}>
                  {container.entity.team
                    ? container.entity.team.name
                    : container.entity.league
                    ? container.entity.league.name
                    : container.entity.name}
                  <button
                    className={classes.clearButton}
                    onClick={() => handleClearEntity(index)}
                  >
                    X
                  </button>
                </div>
              ) : (
                <input
                  className={classes.searchInput}
                  type="search"
                  placeholder="Szukaj drużyny, ligi lub kraju"
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

            {/* Showdown tylko dla aktywnego kontenera */}
            {selectedIndex === index && searchInput && (
              <div className={classes.showdownContainer}>
                {isLoadingSearch ? (
                  <div className={classes.loading}>Ładowanie...</div>
                ) : isErrorSearch ? (
                  <div className={classes.error}>Błąd ładowania danych.</div>
                ) : searchResults && searchResults.length > 0 ? (
                  <ul className={classes.resultsList}>
                    {searchResults.map((result, idx) => {
                      const entityType =
                        idx === 0 ? "team" : idx === 1 ? "league" : "country";

                      return result.response.map((entity) => (
                        <li
                          key={entity.id}
                          onClick={() => handleSelectEntity(entity, index)}
                          className={classes.resultItem}
                        >
                          {idx === 0 && entity.team
                            ? entity.team.name
                            : idx === 1 && entity.league
                            ? entity.league.name
                            : idx === 2
                            ? entity.name
                            : "Nieznany obiekt"}{" "}
                          ({entityType})
                        </li>
                      ));
                    })}
                  </ul>
                ) : (
                  <div className={classes.noResults}>Brak wyników</div>
                )}
              </div>
            )}

            {/* Wyszukiwanie zawodników */}
            {container.entity && selectedEntityId && (
              <div className={classes.playerSearchContainer}>
                <input
                  type="search"
                  placeholder="Szukaj zawodnika"
                  value={playerSearchInputs[index]}
                  onChange={(e) =>
                    updatePlayerSearchInput(e.target.value, index)
                  }
                  className={classes.searchInput}
                />
                {isLoadingPlayers ? (
                  <div className={classes.loading}>Ładowanie...</div>
                ) : isErrorPlayers ? (
                  <div className={classes.error}>
                    Błąd ładowania zawodników.
                  </div>
                ) : playerResults && playerResults.length > 0 ? (
                  <div className={classes.showdownContainer}>
                    <ul className={classes.resultsList}>
                      {playerResults.map((player) => (
                        <li
                          key={player.id}
                          className={classes.resultItem}
                          onClick={() => handleSelectPlayer(player, index)}
                        >
                          {player.player.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  // Jeśli brak zawodników w wynikach, sprawdź, czy wyniki są puste
                  <div className={classes.noResults}>
                    {playerSearchInputs[index] && "Brak zawodników"}
                  </div>
                )}
              </div>
            )}

            {/* Wyświetlanie statystyk zawodnika */}
            {container.player && (
              <div className={classes.playerStats}>
                {renderStats(container.player.statistics[0])}
              </div>
            )}
          </div>
        ))}

        {isModalOpen && (
          <PlayerStatsModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            containers={containers}
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
            Wyświetl wykresy
          </button>
        </div>
      )}
    </>
  );
}
