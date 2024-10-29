import React from "react";
import styles from "./Player.module.css";
import shirtImage from "../../assets/shirtRed.svg";

function Player({ name, number }) {
  return (
    <div
      className={styles.player}
      style={{ backgroundImage: `url(${shirtImage})` }}
    >
      <div className={styles.playerInfo}>
        <span>{name}</span>&nbsp;
        <span>#{number}</span>
      </div>
    </div>
  );
}

export default Player;
