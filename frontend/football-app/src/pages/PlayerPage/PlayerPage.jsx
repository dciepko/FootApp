import NavMenu from "../../components/NavMenu/NavMenu";
import PlayerAdditionalInfoPage from "../../components/PlayerPage/PlayerAdditionalInfoPage/PlayerAdditionalInfoPage";
import PlayerStatisticsPage from "../../components/PlayerPage/PlayerStatisticsPage/PlayerStatisticsPage";
import PlayerInfoPage from "../../components/PlayerPage/PlayerInfoPage/PlayerInfoPage";
import classes from "./PlayerPage.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePlayerSeasonsData } from "../../hooks/usePlayer/usePlayerSeasons";
import { usePlayerStatisticsAndInfoData } from "../../hooks/usePlayer/usePlayerStatisticsAndInfo";

// Helper function to determine the starting year of the current season based on today's date
const getCurrentSeasonStartYear = () => {
  const today = new Date();
  const year = today.getFullYear();
  const isBeforeJuly = today.getMonth() < 6;
  return isBeforeJuly ? year - 1 : year;
};

export default function PlayerPage() {
  const { playerId } = useParams();
  const [currentContent, setCurrentContent] = useState("info");

  const {
    data: playerSeasonsData,
    isLoading,
    error,
  } = usePlayerSeasonsData(playerId);

  const currentSeasonStartYear = getCurrentSeasonStartYear() + 1;

  const validSeasons =
    playerSeasonsData?.response?.filter((season) => {
      const seasonYear = season;
      return seasonYear <= currentSeasonStartYear;
    }) || [];

  const newestSeason =
    validSeasons.length > 0 ? validSeasons[validSeasons.length - 1] : null;

  const renderContent = () => {
    switch (currentContent) {
      case "info":
        return (
          <div className={classes.basicInformationSection}>
            <div className={classes.mainPart}>
              <PlayerInfoPage id={playerId} newestSeason={newestSeason} />
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
          <div className={classes.statisticsSection}>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("info")}
              >
                &#129128;
              </button>
            </div>
            <div className={classes.mainPart}>
              {/* <PlayerStatisticsPage
                id={playerId}
                seasons={validSeasons}
                newestSeason={newestSeason}
              /> */}
            </div>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("additional")}
              >
                &#129130;
              </button>
            </div>
          </div>
        );

      case "additional":
        return (
          <div className={classes.additionalInfoSection}>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("statistics")}
              >
                &#129128;
              </button>
            </div>
            <div className={classes.mainPart}>
              <PlayerAdditionalInfoPage id={playerId} />
            </div>
          </div>
        );

      default:
        return <div className={classes.error}>Content not found.</div>;
    }
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <main className={classes.loadingContainer}>
        <NavMenu />
        <div className={classes.loading}>Loading player data...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={classes.errorContainer}>
        <NavMenu />
        <div className={classes.error}>
          An error occurred while loading player data: {error.message}
        </div>
      </main>
    );
  }

  // Check for empty or missing data before rendering content
  if (!playerSeasonsData || validSeasons.length === 0 || !newestSeason) {
    return (
      <main className={classes.errorContainer}>
        <NavMenu />
        <div className={classes.error}>Player data is not available.</div>
      </main>
    );
  }

  return (
    <main>
      <NavMenu />
      {renderContent()}
    </main>
  );
}
