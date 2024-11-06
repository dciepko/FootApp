import React, { useState } from "react";
import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./ComparePage.module.css";
import TeamComparison from "../../components/ComparePage/TeamComparison/TeamComparison";
import PlayerComparison from "../../components/ComparePage/PlayerComparison/PlayerComparison";

export default function ComparePage() {
  const [comparisonType, setComparisonType] = useState("team");

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
        {comparisonType === "team" ? <TeamComparison /> : <PlayerComparison />}
      </div>
    </main>
  );
}
