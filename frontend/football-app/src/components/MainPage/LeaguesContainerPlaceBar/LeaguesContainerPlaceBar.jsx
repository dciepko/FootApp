// LeaguesContainerPlaceBar.jsx

import classes from "./LeaguesContainerPlaceBar.module.css";

export default function LeaguesContainerPlaceBar({ place }) {
  return (
    <li className={classes.placeBarItem}>
      <span>{place.rank}</span>
      <span>{place.team.name}</span>
      <span>{place.goalsDiff}</span>
      <span>{place.points}</span>
    </li>
  );
}
