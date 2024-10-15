import { useState } from "react";
import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./MatchPage.module.css";

export default function MatchPage() {
  const [currentContent, setCurrentContent] = useState("info");

  const renderContent = () => {
    switch (currentContent) {
      case "info":
        return (
          <div className={classes.infoSection}>
            <div className={classes.mainPart}></div>
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
            <div className={classes.mainPart}></div>
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
            <div className={classes.mainPart}></div>
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
