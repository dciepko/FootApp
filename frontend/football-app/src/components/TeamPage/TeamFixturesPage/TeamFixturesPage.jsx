import { useState } from "react";
import classes from "./TeamFixturesPage.module.css";
import fixturesData from "../../../data/team/MUFixtures.json"; // przykładowa ścieżka do danych
import seasonsData from "../../../data/team/MUSeasons.json";
import DropdownOption from "../../DropdownOption/DropdownOption";

export default function TeamFixturesPage() {
  // Początkowy wybór ligi i sezonu
  const [chosenLeague, setChosenLeague] = useState(fixturesData[0].league.id);
  const [chosenSeason, setChosenSeason] = useState(
    fixturesData[0].league.season
  );

  // Unikalne ligi na podstawie fixtures
  const availableLeagues = Array.from(
    new Set(fixturesData.map((fixture) => fixture.league.id))
  ).map((leagueId) => {
    const league = fixturesData.find(
      (fixture) => fixture.league.id === leagueId
    ).league;
    return {
      id: league.id,
      name: league.name,
    };
  });

  // Filtrowanie dostępnych sezonów na podstawie wybranej ligi
  const availableSeasons = Array.from(
    new Set(
      fixturesData
        .filter((fixture) => fixture.league.id === chosenLeague)
        .map((fixture) => fixture.league.season)
    )
  );

  // Filtrowanie meczów na podstawie wybranej ligi i sezonu
  const selectedFixtures = fixturesData.filter(
    (fixture) =>
      fixture.league.id === chosenLeague &&
      fixture.league.season === chosenSeason
  );

  // Formatowanie etykiety sezonu np. "20 / 21"
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
            labelFormatter={(leagueId) =>
              availableLeagues.find((league) => league.id === leagueId).name
            }
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
          <h2>
            Fixtures -{" "}
            {availableLeagues.find((league) => league.id === chosenLeague).name}{" "}
            - {formatSeasonLabel(chosenSeason)}
          </h2>
          <div className={classes.fixturesList}>
            {selectedFixtures.map((fixture) => (
              <div className={classes.fixture} key={fixture.fixture.id}>
                <div className={classes.fixtureHeader}>
                  <span className={classes.round}>{fixture.league.round}</span>
                  <span className={classes.date}>
                    {new Date(fixture.fixture.date).toLocaleDateString()} -{" "}
                    {new Date(fixture.fixture.date).toLocaleTimeString()}
                  </span>
                  <span className={classes.venue}>
                    {fixture.fixture.venue.name}, {fixture.fixture.venue.city}
                  </span>
                </div>
                <div className={classes.teams}>
                  <div className={classes.team}>
                    <img
                      src={fixture.teams.home.logo}
                      alt={fixture.teams.home.name}
                    />
                    <span>{fixture.teams.home.name}</span>
                  </div>
                  <span className={classes.vs}>vs</span>
                  <div className={classes.team}>
                    <img
                      src={fixture.teams.away.logo}
                      alt={fixture.teams.away.name}
                    />
                    <span>{fixture.teams.away.name}</span>
                  </div>
                </div>
                <div className={classes.score}>
                  {fixture.goals.home !== null &&
                  fixture.goals.away !== null ? (
                    <span>
                      {fixture.goals.home} - {fixture.goals.away}
                    </span>
                  ) : (
                    <span>TBD</span>
                  )}
                </div>
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
