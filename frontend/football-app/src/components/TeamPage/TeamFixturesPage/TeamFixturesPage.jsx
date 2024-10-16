import { useState } from "react";
import classes from "./TeamFixturesPage.module.css";
import fixturesData from "../../../data/team/MUFixtures.json"; // przykładowa ścieżka do danych
import seasonsData from "../../../data/team/MUSeasons.json";
import DropdownOption from "../../DropdownOption/DropdownOption";
import { Link } from "react-router-dom";

export default function TeamFixturesPage() {
  const availableLeagues = Array.from(
    new Set(fixturesData.map((fixture) => fixture.league.name))
  );

  const availableSeasons = seasonsData;

  const [chosenLeague, setChosenLeague] = useState(availableLeagues[0]);
  const [chosenSeason, setChosenSeason] = useState(
    availableSeasons[availableSeasons.length - 1]
  );

  const selectedFixtures = fixturesData.filter(
    (fixture) =>
      fixture.league.name === chosenLeague &&
      fixture.league.season === chosenSeason
  );

  const formatSeasonLabel = (season) => {
    return (
      season.toString().slice(2) +
      " / " +
      (Number(season.toString().slice(2)) + 1).toString()
    );
  };

  return (
    <div className={classes.fixturesPage}>
      <div className={classes.choosePart}>
        <div className={classes.chooseSection}>
          {/* Dropdown do wyboru ligi */}
          <DropdownOption
            options={availableLeagues}
            chosenOption={chosenLeague}
            setChosenOption={setChosenLeague}
          />

          {/* Dropdown do wyboru sezonu */}
          <DropdownOption
            options={availableSeasons}
            chosenOption={chosenSeason}
            setChosenOption={setChosenSeason}
            labelFormatter={formatSeasonLabel}
          />
        </div>
      </div>

      {selectedFixtures.length > 0 ? (
        <div className={classes.fixturesSection}>
          <div className={classes.fixturesList}>
            {selectedFixtures.map((fixture) => (
              <div className={classes.fixture} key={fixture.fixture.id}>
                <div className={classes.dateHeader}>
                  <span className={classes.round}>{fixture.league.round}</span>
                  &nbsp; &nbsp;|&nbsp; &nbsp;
                  <span className={classes.date}>
                    {new Date(fixture.fixture.date).toLocaleDateString()} -{" "}
                    {new Date(fixture.fixture.date).toLocaleTimeString()}
                  </span>
                  &nbsp; &nbsp;|&nbsp; &nbsp;
                  <span className={classes.venue}>
                    {fixture.fixture.venue.name}, {fixture.fixture.venue.city}
                  </span>
                </div>
                <Link className="disablingLinks" to={"/match"}>
                  <div key={fixture.fixture.id} className={classes.singleMatch}>
                    <span>{fixture.teams.home.name}</span>
                    <span>{fixture.goals.home}</span>
                    <span> &nbsp;:&nbsp;</span>
                    <span>{fixture.goals.away}</span>
                    <span>{fixture.teams.away.name}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No fixtures available for this season and league.</p>
      )}
    </div>
  );
}
