import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./SingleLeaguePage.module.css";
import leagues from "../../data/leagues.json";
import { useQuery } from "@tanstack/react-query";
import plSingle from "../../data/PLSingle.json";
import { useState } from "react";
import StandingsPage from "../../components/SingleLeaguePage/StandingsPage/StandingsPage";
import MatchesPage from "../../components/SingleLeaguePage/MatchesPage/MatchesPage";
import StatisticsPage from "../../components/SingleLeaguePage/StatisticsPage/StatisticsPage";

const fetchLeagueData = async ({ queryKey }) => {
  const [_key, chosenLeagueId] = queryKey;

  const url = `https://api-football-v1.p.rapidapi.com/v3/leagues?id=${chosenLeagueId}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ca33205c25msh1c3782cdb879e0ap1b6970jsnf69950db386a",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Error fetching the league's data");
  }

  const result = await response.json();
  return result.response;
};

export default function SingleLeaguePage({ chosenLeagueId = 39 }) {
  //   const { data, error, isLoading } = useQuery({
  //     queryFn: fetchLeagueData,
  //     queryKey: ["fixtures", chosenLeagueId],
  //   });

  const seasonsData = plSingle[0].seasons;
  const data = plSingle[0];

  const [chosenSeason, setChosenSeason] = useState(
    seasonsData[seasonsData.length - 1].year.toString()
  );
  const [seasonShowdown, setSeasonShowdown] = useState(false);
  const [currentContent, setCurrentContent] = useState("standings");

  const renderContent = () => {
    switch (currentContent) {
      case "standings":
        return (
          <div className={classes.contentContainerStandings}>
            <div className={classes.mainPart}>
              <StandingsPage />
            </div>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("statistics")}
              >
                &#129130;
              </button>
            </div>
          </div>
        );

      case "statistics":
        return (
          <div className={classes.contentContainerStatistics}>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("standings")}
              >
                &#129128;
              </button>
            </div>
            <div className={classes.mainPart}>
              <StatisticsPage />
            </div>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("matches")}
              >
                &#129130;
              </button>
            </div>
          </div>
        );

      case "matches":
        return (
          <div className={classes.contentContainerMatches}>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("statistics")}
              >
                &#129128;
              </button>
            </div>
            <div className={classes.mainPart}>
              <MatchesPage />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main>
      <NavMenu />
      <div className={classes.mainSection}>
        <div className={classes.informationContainer}>
          <div className={classes.images}>
            <div className={classes.logoContainer}>
              <img src={data.league.logo} alt="League logo" />
            </div>
            <div className={classes.flagContainer}>
              <img src={data.country.flag} alt="League's country" />
            </div>
          </div>
          <div className={classes.names}>
            <div className={classes.leagueName}>{data.league.name}</div>
            <div className={classes.secondary}>
              <div className={classes.countryName}>{data.country.name}</div>
              &nbsp;|&nbsp;
              <div className={classes.typeName}>{data.league.type}</div>
            </div>
          </div>
          <div className={classes.seasonsContainer}>
            <div className={classes.optionContainer}>
              <button className={classes.optionButton}>
                <span
                  onClick={() => {
                    setSeasonShowdown(!seasonShowdown);
                  }}
                >
                  {chosenSeason.slice(2) +
                    " / " +
                    (Number(chosenSeason.slice(2)) + 1).toString()}
                </span>
              </button>
              {seasonShowdown && (
                <ul className={classes.optionMenu}>
                  {seasonsData.map((season) => {
                    return (
                      <li
                        key={season.year}
                        onClick={() => {
                          setChosenSeason(season.year.toString());
                          setSeasonShowdown(false);
                        }}
                      >
                        {season.year.toString().slice(2) +
                          " / " +
                          (season.year + 1).toString().slice(2)}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>

        {renderContent()}
      </div>
    </main>
  );
}

// z konkretnej ligi czyli aktualnego fetcha moge tylko wziac sezony
// z id ligii i sezonem mozna zrobic nowego fetcha do standings
