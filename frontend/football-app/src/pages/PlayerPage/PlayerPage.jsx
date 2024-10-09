import NavMenu from "../../components/NavMenu/NavMenu";
import PlayerAdditionalInfoPage from "../../components/PlayerPage/PlayerAdditionalInfoPage/PlayerAdditionalInfoPage";
import PlayerStatisticsPage from "../../components/PlayerPage/PlayerStatisticsPage/PlayerStatisticsPage";
import PlayerInfoPage from "../../components/PlayerPage/PlayerInfoPage/PlayerInfoPage";
import classes from "./PlayerPage.module.css";
import { useState } from "react";

export default function PlayerPage() {
  const [currentContent, setCurrentContent] = useState("info");

  const renderContent = () => {
    switch (currentContent) {
      case "info":
        return (
          <div className={classes.basicInformationSection}>
            <div className={classes.mainPart}>
              <PlayerInfoPage />
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
              <PlayerStatisticsPage />
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
              <PlayerAdditionalInfoPage />
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

      {renderContent()}
    </main>
  );
}
