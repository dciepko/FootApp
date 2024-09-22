import classes from "./ResultBar.module.css";

export default function ResultBar({ fixture, className }) {
  const backgroundColor = className === "odd" ? "transparent" : "#e6292c";
  const fontColor = className === "odd" ? "black" : "white";

  return (
    <li
      className={classes.barItem}
      style={{ backgroundColor: backgroundColor, color: fontColor }}
    >
      <button className={classes.barObject}>
        <span className={classes.homePart}>
          <div className={classes.logoContainer}>
            <img
              className={classes.logoImg}
              src={fixture.teams.home.logo}
              alt="Team logo"
            />
          </div>
          <div className={classes.nameContainer}>{fixture.teams.home.name}</div>
          <div>{fixture.goals.home}</div>
        </span>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          -
        </span>
        <span className={classes.awayPart}>
          <div>{fixture.goals.away}</div>
          <div className={classes.nameContainer}>{fixture.teams.away.name}</div>
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
