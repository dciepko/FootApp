import React, { useState } from "react";
import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./ComparePage.module.css";

export default function ComparePage() {
  const [comparisonType, setComparisonType] = useState("team");
  const [containers, setContainers] = useState([{}, {}]);

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

  return (
    <main>
      <NavMenu />

      <div className={classes.comparisonOptions}>
        <button
          className={comparisonType === "team" ? classes.activeButton : ""}
          onClick={() => setComparisonType("team")}
        >
          Teams
        </button>
        <button
          className={comparisonType === "player" ? classes.activeButton : ""}
          onClick={() => setComparisonType("player")}
        >
          Players
        </button>
      </div>

      <div className={classes.containersWrapper}>
        {containers.map((container, index) => (
          <div key={index} className={classes.comparisonContainer}>
            <div className={classes.containerHeader}>
              <input
                className={classes.searchInput}
                type="search"
                placeholder={`Search for a ${
                  comparisonType === "team" ? "Team" : "Player"
                }`}
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
          </div>
        ))}
        {containers.length < 4 && (
          <div className={classes.addButtonContainer}>
            <button className={classes.addButton} onClick={addContainer}>
              +
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
