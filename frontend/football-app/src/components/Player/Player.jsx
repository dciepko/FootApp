import React from "react";
import styles from "./Player.module.css";
import shirtImageField from "../../assets/shirtBlue.svg";
import shirtImageGoalkeeper from "../../assets/shirtRed.svg";

function Player({ name, number, position }) {
  const shirt = position === "G" ? shirtImageGoalkeeper : shirtImageField;

  return (
    <div className={styles.player} style={{ backgroundImage: `url(${shirt})` }}>
      <div className={styles.playerInfo}>
        <span>{name}</span>&nbsp;
        <span>#{number}</span>
      </div>
    </div>
  );
}

export default Player;
