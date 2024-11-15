import React from "react";
import Player from "../Player/Player";
import { groupPlayersByRow } from "../../utils/groupPlayersByRow";
import styles from "./Field.module.css";
import { Link } from "react-router-dom";

function Field({ team }) {
  const playersByRow = groupPlayersByRow(team.startXI);

  return (
    <div className={styles.field}>
      {Object.keys(playersByRow)
        .reverse()
        .map((rowKey) => {
          const playersInRow = playersByRow[rowKey];
          const numCols = playersInRow.length;
          console.log(playersInRow);

          return (
            <div
              key={rowKey}
              className={styles.fieldRow}
              style={{
                gridTemplateColumns: `repeat(${numCols}, 1fr)`,
              }}
            >
              {playersInRow.map((player, index) => (
                <Link className="disablingLinks" to={`/player/${player.id}`}>
                  <Player
                    key={index}
                    name={player.name}
                    number={player.number}
                    position={player.pos}
                  />
                </Link>
              ))}
            </div>
          );
        })}
    </div>
  );
}

export default Field;
