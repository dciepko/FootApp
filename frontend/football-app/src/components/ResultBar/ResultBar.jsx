import classes from "./ResultBar.module.css";

export default function ResultBar({ fixture }) {
  return (
    <li className={classes.barItem}>
      <button className={classes.barObject}>{fixture.teams.away.name}</button>
    </li>
  );
}
