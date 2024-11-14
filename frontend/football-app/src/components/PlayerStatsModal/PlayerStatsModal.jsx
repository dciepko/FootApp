import React, { useState } from "react";
import classes from "./PlayerStatsModal.module.css";
import TeamBarChart from "../Charts/TeamBarChart";
import PlayerBarChart from "../Charts/PlayerBarChart";

const PlayerStatsModal = ({ isOpen, onClose, containers }) => {
  const [playerColors] = useState({});

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const getPlayerColor = (playerName) => {
    if (!playerColors[playerName]) {
      playerColors[playerName] = generateRandomColor();
    }
    return playerColors[playerName];
  };

  const prepareChartDataForCategory = (category) => {
    return containers.map((container) => {
      const playerData = container.player?.statistics?.[0]?.[category];
      console.log(playerData);
      const values = [];

      const processStats = (data, prefix = "") => {
        Object.entries(data).forEach(([key, value]) => {
          const name = prefix ? `${prefix} - ${key}` : key;
          if (typeof value === "object" && value !== null) {
            processStats(value, name);
          } else {
            values.push({
              name,
              value: value !== null ? value : 0,
              player: container.player.player.name,
              color: getPlayerColor(container.player.player.name),
            });
          }
        });
      };

      if (playerData && typeof playerData === "object") {
        processStats(playerData);
        console.log("si");
      } else if (playerData !== undefined) {
        values.push({
          name: category,
          value: playerData !== null ? playerData : 0,
          player: container.player.player.name,
          color: getPlayerColor(container.player.player.name),
        });
        console.log("nope");
      }
      console.log(values);

      return values;
    });
  };

  const excludedCategories = ["team", "league"];

  const categories = containers.reduce((acc, container) => {
    const playerData = container.player?.statistics?.[0] || {};
    Object.keys(playerData).forEach((category) => {
      if (!acc.includes(category) && !excludedCategories.includes(category)) {
        acc.push(category);
      }
    });
    return acc;
  }, []);

  if (!isOpen) return null;

  return (
    <div className={classes.modalOverlay} onClick={onClose}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={classes.closeModal} onClick={onClose}>
          X
        </button>
        {categories.map((category, index) => {
          const chartData = prepareChartDataForCategory(category).flat();
          return (
            <div key={index} className={classes.chartContainer}>
              <h3>{category.toUpperCase()}</h3>
              <PlayerBarChart data={chartData} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerStatsModal;
