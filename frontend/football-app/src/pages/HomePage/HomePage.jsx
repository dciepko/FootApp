import classes from "./HomePage.module.css";
import ResultContainer from "../../components/MainPage/ResultContainer/ResultContainer";
import LeaguesContainer from "../../components/MainPage/LeaguesContainer/LeaguesContainer";
import AdditionalContainer from "../../components/MainPage/AdditionalContainer/AdditionalContainer";
import NavMenu from "../../components/NavMenu/NavMenu";

export default function HomePage() {
  return (
    <main>
      <NavMenu />
      <section className={classes.mainSection}>
        <div className={classes.currentResultsContainer}>
          <div className={classes.currentResultsShape}>
            <ResultContainer />
          </div>
        </div>
        <div className={classes.leaguesContainer}>
          <div className={classes.leaguesShape}>
            <LeaguesContainer />
          </div>
        </div>
        <div className={classes.additionalContainer}>
          <div className={classes.additionalShape}>
            <AdditionalContainer />
          </div>
        </div>
      </section>
    </main>
  );
}
