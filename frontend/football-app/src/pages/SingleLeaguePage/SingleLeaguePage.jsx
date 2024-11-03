import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./SingleLeaguePage.module.css";
import { useState, useEffect } from "react";
import StandingsPage from "../../components/SingleLeaguePage/StandingsPage/StandingsPage";
import MatchesPage from "../../components/SingleLeaguePage/MatchesPage/MatchesPage";
import StatisticsPage from "../../components/SingleLeaguePage/StatisticsPage/StatisticsPage";
import { useParams } from "react-router-dom";
import { useLeagueById } from "../../hooks/useLeague/useLeagueById";

export default function SingleLeaguePage() {
  const { leagueId } = useParams();
  const { data: leagueData, isLoading, error } = useLeagueById(leagueId);
  const [chosenSeason, setChosenSeason] = useState(null);
  const [seasonShowdown, setSeasonShowdown] = useState(false);
  const [currentContent, setCurrentContent] = useState("standings");

  // Ustawienie ostatniego sezonu po załadowaniu danych
  useEffect(() => {
    if (leagueData && leagueData.results && leagueData.results.length > 0) {
      const latestSeason =
        leagueData.results[0].seasons[leagueData[0].seasons.length - 1].year;
      setChosenSeason(latestSeason.toString());
    }
  }, [leagueData]);

  if (isLoading) return <div>Ładowanie danych ligi...</div>;
  if (error) return <div>Błąd: {error.message}</div>;

  const renderContent = () => {
    switch (currentContent) {
      case "standings":
        return (
          <div className={classes.contentContainerStandings}>
            <StandingsPage leagueId={leagueId} season={chosenSeason} />
            <button onClick={() => setCurrentContent("statistics")}>
              &#129130;
            </button>
          </div>
        );
      case "statistics":
        return (
          <div className={classes.contentContainerStatistics}>
            <button onClick={() => setCurrentContent("standings")}>
              &#129128;
            </button>
            <StatisticsPage leagueId={leagueId} season={chosenSeason} />
            <button onClick={() => setCurrentContent("matches")}>
              &#129130;
            </button>
          </div>
        );
      case "matches":
        return (
          <div className={classes.contentContainerMatches}>
            <button onClick={() => setCurrentContent("statistics")}>
              &#129128;
            </button>
            <MatchesPage leagueId={leagueId} season={chosenSeason} />
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
            <img src={leagueData[0].league.logo} alt="League logo" />
            <img src={leagueData[0].country.flag} alt="Country flag" />
          </div>
          <div className={classes.names}>
            <div className={classes.leagueName}>
              {leagueData[0].league.name}
            </div>
            <div className={classes.secondary}>
              <div className={classes.countryName}>
                {leagueData[0].country.name}
              </div>
              <div className={classes.typeName}>
                {leagueData[0].league.type}
              </div>
            </div>
          </div>
          <div className={classes.seasonsContainer}>
            <button onClick={() => setSeasonShowdown(!seasonShowdown)}>
              {chosenSeason}
            </button>
            {seasonShowdown && (
              <ul className={classes.optionMenu}>
                {leagueData[0].seasons.map((season) => (
                  <li
                    key={season.year}
                    onClick={() => {
                      setChosenSeason(season.year.toString());
                      setSeasonShowdown(false);
                    }}
                  >
                    {`${season.year}/${season.year + 1}`}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {renderContent()}
      </div>
    </main>
  );
}
