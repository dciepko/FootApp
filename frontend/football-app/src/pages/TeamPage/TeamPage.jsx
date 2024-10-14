import { useState } from "react";
import NavMenu from "../../components/NavMenu/NavMenu";
import TeamFixturesPage from "../../components/TeamPage/TeamFixturesPage/TeamFixturesPage";
import TeamInfoPage from "../../components/TeamPage/TeamInfoPage/TeamInfoPage";
import TeamSquadPage from "../../components/TeamPage/TeamSquadPage/TeamSquadPage";
import TeamStandingsPage from "../../components/TeamPage/TeamStandingsPage/TeamStandingsPage";
import TeamStatisticsPage from "../../components/TeamPage/TeamStatisticsPage/TeamStatisticsPage";
import classes from "./TeamPage.module.css";
import TeamTransferPage from "../../components/TeamPage/TeamTransferPage/TeamTransferPage";

export default function TeamPage() {
  const [currentContent, setCurrentContent] = useState("info");

  const renderContent = () => {
    switch (currentContent) {
      case "info":
        return (
          <div className={classes.firstPage}>
            <div className={classes.mainPart}>
              <TeamInfoPage />
            </div>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("squad")}
              >
                &#129130;
              </button>
            </div>
          </div>
        );

      case "squad":
        return (
          <div className={classes.inBetweenPage}>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("info")}
              >
                &#129128;
              </button>
            </div>
            <div className={classes.mainPart}>
              <TeamSquadPage />
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
          <div className={classes.inBetweenPage}>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("squad")}
              >
                &#129128;
              </button>
            </div>
            <div className={classes.mainPart}>
              <TeamStatisticsPage />
            </div>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("standings")}
              >
                &#129130;
              </button>
            </div>
          </div>
        );

      case "standings":
        return (
          <div className={classes.inBetweenPage}>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("statistics")}
              >
                &#129128;
              </button>
            </div>
            <div className={classes.mainPart}>
              <TeamStandingsPage />
            </div>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("fixtures")}
              >
                &#129130;
              </button>
            </div>
          </div>
        );

      case "fixtures":
        return (
          <div className={classes.inBetweenPage}>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("standings")}
              >
                &#129128;
              </button>
            </div>
            <div className={classes.mainPart}>
              <TeamFixturesPage />
            </div>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("transfers")}
              >
                &#129130;
              </button>
            </div>
          </div>
        );

      case "transfers":
        return (
          <div className={classes.lastPage}>
            <div className={classes.arrowPart}>
              <button
                className={classes.arrowButton}
                onClick={() => setCurrentContent("fixtures")}
              >
                &#129128;
              </button>
            </div>
            <div className={classes.mainPart}>
              <TeamTransferPage />
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
      <div className={classes.mainSection}>{renderContent()}</div>
    </main>
  );
}
