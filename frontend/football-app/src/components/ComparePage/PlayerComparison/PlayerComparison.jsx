import React, { useState } from "react";
import classes from "./PlayerComparison.module.css";

export default function PlayerComparison() {
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
    <>
      {containers.map((container, index) => (
        <div key={index} className={classes.comparisonContainer}>
          <div className={classes.containerHeader}>
            <input
              className={classes.searchInput}
              type="search"
              placeholder="Search for a Player"
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
    </>
  );
}
