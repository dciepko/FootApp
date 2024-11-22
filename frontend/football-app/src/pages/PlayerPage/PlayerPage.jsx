import NavMenu from "../../components/NavMenu/NavMenu";
import PlayerAdditionalInfoPage from "../../components/PlayerPage/PlayerAdditionalInfoPage/PlayerAdditionalInfoPage";
import PlayerStatisticsPage from "../../components/PlayerPage/PlayerStatisticsPage/PlayerStatisticsPage";
import PlayerInfoPage from "../../components/PlayerPage/PlayerInfoPage/PlayerInfoPage";
import classes from "./PlayerPage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlayerSeasonsData } from "../../hooks/usePlayer/usePlayerSeasons";
import { usePlayerStatisticsAndInfoData } from "../../hooks/usePlayer/usePlayerStatisticsAndInfo";
import Loader from "../../components/Loader/Loader";
import DotNavigation from "../../components/DotNavigation/DotNavigation";

const getCurrentSeasonStartYear = () => {
  const today = new Date();
  const year = today.getFullYear();
  const isBeforeJuly = today.getMonth() < 6;
  return isBeforeJuly ? year - 1 : year;
};

const pages = ["info", "statistics", "additional"];

export default function PlayerPage() {
  const { playerId } = useParams();
  const [currentContent, setCurrentContent] = useState("info");

  const {
    data: playerSeasonsData,
    isLoading: seasonsLoading,
    error: seasonsError,
  } = usePlayerSeasonsData(playerId);

  const currentSeasonStartYear = getCurrentSeasonStartYear() + 1;

  const validSeasons =
    playerSeasonsData?.response?.filter(
      (season) => season <= currentSeasonStartYear
    ) || [];

  const newestSeason =
    validSeasons.length > 0 ? validSeasons[validSeasons.length - 1] : null;

  const {
    data: playerStatisticsData,
    isLoading: statisticsLoading,
    error: statisticsError,
  } = usePlayerStatisticsAndInfoData(playerId, newestSeason);

  const firstCompetition =
    playerStatisticsData?.response?.[0]?.statistics?.[0]?.league?.name || null;

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
              <PlayerStatisticsPage
                id={playerId}
                seasons={validSeasons}
                newestSeason={newestSeason}
                firstCompetition={firstCompetition}
              />
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

  if (seasonsLoading || statisticsLoading) {
    return (
      <main className={classes.loadingContainer}>
        <NavMenu />
        <Loader />
      </main>
    );
  }

  if (seasonsError || statisticsError) {
    return (
      <main className={classes.errorContainer}>
        <NavMenu />
        <div className={classes.error}>
          {seasonsError && (
            <div>Error loading player seasons: {seasonsError.message}</div>
          )}
          {statisticsError && (
            <div>
              Error loading player statistics: {statisticsError.message}
            </div>
          )}
        </div>
      </main>
    );
  }

  if (
    !playerSeasonsData ||
    validSeasons.length === 0 ||
    !newestSeason ||
    !playerStatisticsData
  ) {
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
      <span className={classes.containerToFitDots}>
        <DotNavigation
          pages={pages}
          currentPage={currentContent}
          onPageChange={(page) => setCurrentContent(pages[page])}
        />
        {renderContent()}
      </span>
    </main>
  );
}
