import classes from "./ResultBar.module.css";

export default function ResultBar({ fixture }) {
  return (
    <li className={classes.barItem}>
      <button className={classes.barObject}>
        <span className={classes.homePart}>
          <div className={classes.logoContainer}>
            <img
              className={classes.logoImg}
              src={fixture.teams.home.logo}
              alt="Team logo"
            />
          </div>
          <div>{fixture.teams.home.name}</div>
          <div>{fixture.goals.home}</div>
        </span>
        -
        <span className={classes.awayPart}>
          <div>{fixture.goals.away}</div>
          <div>{fixture.teams.away.name}</div>
          <div className={classes.logoContainer}>
            <img
              className={classes.logoImg}
              src={fixture.teams.away.logo}
              alt="Team logo"
            />
          </div>
        </span>
      </button>
    </li>
  );
}
