import React, { useState } from "react";
import TeamBarChart from "../Charts/TeamBarChart";
import classes from "./TeamStatsModal.module.css";

const TeamStatsModal = ({ isOpen, onClose, containers, teamStatistics }) => {
  const [teamColors] = useState({});

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const getTeamColor = (teamName) => {
    if (!teamColors[teamName]) {
      teamColors[teamName] = generateRandomColor();
    }
    return teamColors[teamName];
  };

  const prepareChartDataForCategory = (category) => {
    return containers.map((container) => {
      const teamData = teamStatistics[container.team?.id]?.data;
      const categoryData = teamData ? teamData[category] : null;
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
              team: container.team.name,
              color: getTeamColor(container.team.name),
            });
          }
        });
      };

      if (categoryData && typeof categoryData === "object") {
        processStats(categoryData);
      } else if (categoryData !== undefined) {
        values.push({
          name: category,
          value: categoryData !== null ? categoryData : 0,
          team: container.team.name,
          color: getTeamColor(container.team.name),
        });
      }
      return values;
    });
  };

  const excludedCategories = ["team", "lineups", "league", "form"];

  const categories = containers.reduce((acc, container) => {
    const teamData = teamStatistics[container.team?.id]?.data || {};
    Object.keys(teamData).forEach((category) => {
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
              <TeamBarChart data={chartData} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamStatsModal;
