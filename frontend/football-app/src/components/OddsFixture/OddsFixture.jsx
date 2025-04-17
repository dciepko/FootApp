import { useMatchData } from "../../hooks/useMatchData";
import classes from "./OddsFixture.module.css";

export default function OddsFixture({ fixture, slicedOdds }) {
  const {
    data: matchData,
    isLoading: isMatchLoading,
    error,
  } = useMatchData(fixture.id);

  const homeTeam = matchData?.response?.[0]?.teams?.home;
  const awayTeam = matchData?.response?.[0]?.teams?.away;
  const homeGoals = matchData?.response?.[0]?.goals?.home;
  const awayGoals = matchData?.response?.[0]?.goals?.away;
  const elapsedTime =
    matchData?.response?.[0]?.fixture?.status?.elapsed || "--";

  return (
    <div className={classes.singleFixture}>
      <li className={classes.fixtureBar}>
        <span className={classes.logoContainer}>
          <img
            className={classes.teamLogoImage}
            src={homeTeam?.logo || ""}
            alt={homeTeam?.name || "Logo niedostępne"}
          />
        </span>
        <span className={classes.nameContainer}>
          {homeTeam?.name || "Drużyna A"}
        </span>

        <span className={classes.statusContainer}>
          <span className={classes.timeContainer}>{elapsedTime}'</span>
          <span className={classes.resultContainer}>
            {homeGoals != null ? homeGoals : "--"}
            &nbsp;-&nbsp;
            {awayGoals != null ? awayGoals : "--"}
          </span>
        </span>

        <span className={classes.nameContainer}>
          {awayTeam?.name || "Drużyna B"}
        </span>
        <span className={classes.logoContainer}>
          <img
            className={classes.teamLogoImage}
            src={awayTeam?.logo || ""}
            alt={awayTeam?.name || "Logo niedostępne"}
          />
        </span>
      </li>

      {slicedOdds.map((bet) => (
        <li className={classes.singleBet} key={bet.id}>
          <span className={classes.betName}>{bet.name}</span>
          <span className={classes.betValues}>
            {bet.values.map((value) => (
              <span className={classes.betValue} key={value.id}>
                <span>{value.value}</span>
                <span>&nbsp;-&nbsp;</span>
                <span style={{ fontWeight: "bold" }}>{value.odd}</span>
              </span>
            ))}
          </span>
        </li>
      ))}
    </div>
  );
}
