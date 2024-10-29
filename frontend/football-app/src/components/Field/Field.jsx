// Field.js
import React from "react";
import Player from "../Player/Player";
import { groupPlayersByRow } from "../../utils/groupPlayersByRow";
import styles from "./Field.module.css";

function Field({ team }) {
  const playersByRow = groupPlayersByRow(team.startXI); // Grupowanie zawodników na podstawie rzędów

  return (
    <div className={styles.field}>
      {Object.keys(playersByRow)
        .reverse() // Odwróć kolejność wierszy, aby bramkarz był na dole
        .map((rowKey) => {
          const playersInRow = playersByRow[rowKey];
          const numCols = playersInRow.length; // Liczba kolumn = liczba zawodników w rzędzie

          return (
            <div
              key={rowKey}
              className={styles.fieldRow}
              style={{
                gridTemplateColumns: `repeat(${numCols}, 1fr)`, // Tyle kolumn, ilu graczy
              }}
            >
              {playersInRow.map((player, index) => (
                <Player key={index} name={player.name} number={player.number} />
              ))}
            </div>
          );
        })}
    </div>
  );
}

export default Field;
