import { useState } from "react";
import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./MatchPage.module.css";
import MatchInfoPage from "../../components/MatchPage/MatchInfoPage/MatchInfoPage";
import MatchStatisticsPage from "../../components/MatchPage/MatchStatisticsPage/MatchStatisticsPage";
import MatchPlayersPage from "../../components/MatchPage/MatchPlayersPage/MatchPlayersPage";
import { useParams } from "react-router-dom";
import { useMatchData } from "../../hooks/useMatchData";
import Loader from "../../components/Loader/Loader";
import DotNavigation from "../../components/DotNavigation/DotNavigation";

const pages = ["info", "statistics", "players"];

export default function MatchPage() {
  const [currentContent, setCurrentContent] = useState("info");
  const { matchId } = useParams();
  const { data: matchData, isLoading, error } = useMatchData(matchId);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!matchData) return <div>No available data.</div>;

  const pages = ["info", "statistics", "players"];

  const renderContent = () => {
    switch (currentContent) {
      case "info":
        return (
          <div className={classes.infoSection}>
            <div className={classes.mainPart}>
              <MatchInfoPage data={matchData.response[0]} />
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
              <MatchStatisticsPage data={matchData.response[0]} />
            </div>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("players")}
              >
                &#129130;
              </button>
            </div>
          </div>
        );

      case "players":
        return (
          <div className={classes.playersSection}>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("statistics")}
              >
                &#129128;
              </button>
            </div>
            <div className={classes.mainPart}>
              <MatchPlayersPage data={matchData.response[0]} />
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
