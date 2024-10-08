import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./PlayerPage.module.css";
import { useState } from "react";

export default function PlayerPage() {
  const [currentContent, setCurrentContent] = useState("info");

  const renderContent = () => {
    switch (currentContent) {
      case "info":
        return (
          <div className={classes.basicInformationSection}>
            <div className={classes.mainPart}></div>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("statistics")}
              >
                -&gt;
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
                &lt;-
              </button>
            </div>
            <div className={classes.mainPart}></div>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("additional")}
              >
                -&gt;
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
                &lt;-
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
