import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./SingleLeaguePage.module.css";
import { useState, useEffect } from "react";
import StandingsPage from "../../components/SingleLeaguePage/StandingsPage/StandingsPage";
import MatchesPage from "../../components/SingleLeaguePage/MatchesPage/MatchesPage";
import StatisticsPage from "../../components/SingleLeaguePage/StatisticsPage/StatisticsPage";
import { useParams } from "react-router-dom";
import { useLeagueById } from "../../hooks/useLeague/useLeagueById";
import DropdownOption from "../../components/DropdownOption/DropdownOption";
import { fetchFootballData } from "../../utils/fetchFootballData";
import SearchPlayerPage from "../../components/SingleLeaguePage/SearchPlayerPage/SearchPlayerPage";
import Loader from "../../components/Loader/Loader";

export default function SingleLeaguePage() {
  const { leagueId } = useParams();
  const { data: leagueData, isLoading, error } = useLeagueById(leagueId);

  const [chosenSeason, setChosenSeason] = useState(null);
  const [availableSeasons, setAvailableSeasons] = useState([]);
  const [currentContent, setCurrentContent] = useState("standings");
  const [leagueStandingsData, setLeagueStandingsData] = useState(null);

  useEffect(() => {
    if (leagueData && leagueData.response && leagueData.response.length > 0) {
      const latestSeason =
        leagueData.response[0].seasons[
          leagueData.response[0].seasons.length - 1
        ].year;

      setChosenSeason(latestSeason.toString());
      const seasons = leagueData.response[0].seasons
        .map((season) => season.year)
        .reverse();
      setAvailableSeasons(seasons);
    }
  }, [leagueData]);

  useEffect(() => {
    if (chosenSeason) {
      const fetchStandingsData = async () => {
        if (chosenSeason) {
          try {
            const data = await fetchFootballData(
              `standings?league=${leagueId}&season=${chosenSeason}`
            );
            setLeagueStandingsData(data);
          } catch (err) {}
        }
      };

      fetchStandingsData();
    }
  }, [chosenSeason]);

  if (isLoading) return <Loader />;
  if (error) return <div>Błąd: {error.message}</div>;

  const renderContent = () => {
    switch (currentContent) {
      case "standings":
        return (
          <div className={classes.contentContainerStandings}>
            <div className={classes.mainPart}>
              {leagueStandingsData && (
                <StandingsPage data={leagueStandingsData} />
              )}
            </div>
            <div className={classes.arrowPart}>
              <button
                onClick={() => setCurrentContent("search")}
                className={classes.arrowButton}
              >
                &#129130;
              </button>
            </div>
          </div>
        );

      case "search":
        return (
          <div className={classes.contentContainerStatistics}>
            <div className={classes.arrowPart}>
              <button
                onClick={() => setCurrentContent("standings")}
                className={classes.arrowButton}
              >
                &#129128;
              </button>
            </div>

            <div>
              <SearchPlayerPage id={leagueId} />
            </div>
            <div className={classes.arrowPart}>
              <button
                onClick={() => setCurrentContent("statistics")}
                className={classes.arrowButton}
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
                onClick={() => setCurrentContent("search")}
                className={classes.arrowButton}
              >
                &#129128;
              </button>
            </div>

            <div className={classes.mainPart}>
              <StatisticsPage id={leagueId} season={chosenSeason} />
            </div>
            <div className={classes.arrowPart}>
              <button
                onClick={() => setCurrentContent("matches")}
                className={classes.arrowButton}
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
                onClick={() => setCurrentContent("statistics")}
                className={classes.arrowButton}
              >
                &#129128;
              </button>
            </div>

            <div className={classes.mainPart}>
              <MatchesPage id={leagueId} season={chosenSeason} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const formatSeasonLabel = (season) => {
    return (
      season.toString().slice(2) +
      " / " +
      (Number(season.toString().slice(2)) + 1).toString()
    );
  };

  return (
    <main>
      <NavMenu />
      <div className={classes.mainSection}>
        {leagueData && leagueData.response && leagueData.response.length > 0 ? (
          <div className={classes.informationContainer}>
            <div className={classes.images}>
              <div className={classes.logoContainer}>
                <img
                  src={leagueData.response[0].league.logo}
                  alt="League logo"
                />
              </div>
              <div className={classes.flagContainer}>
                <img
                  src={leagueData.response[0].country.flag}
                  alt="Country flag"
                />
              </div>
            </div>
            <div className={classes.names}>
              <div className={classes.leagueName}>
                {leagueData.response[0].league.name}
              </div>
              <div className={classes.secondary}>
                <div className={classes.countryName}>
                  {leagueData.response[0].country.name}
                </div>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <div className={classes.typeName}>
                  {leagueData.response[0].league.type}
                </div>
              </div>
            </div>
            <div className={classes.seasonsContainer}>
              {chosenSeason && (
                <DropdownOption
                  options={availableSeasons}
                  chosenOption={chosenSeason}
                  setChosenOption={setChosenSeason}
                  labelFormatter={formatSeasonLabel}
                />
              )}
            </div>
          </div>
        ) : (
          <div>Brak danych o lidze.</div>
        )}
        {renderContent()}
      </div>
    </main>
  );
}
