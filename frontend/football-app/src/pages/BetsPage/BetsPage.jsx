import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./BetsPage.module.css";
import oddsLiveData from "../../data/odds.json";

export default function BetsPage() {
  const oddsLive = oddsLiveData;

  return (
    <main>
      <NavMenu />
      <div className={classes.betsPage}>
        {oddsLive.map((odd) => {
          const shuffledOdds = odd.odds.sort(() => 0.5 - Math.random());
          const slicedOdds = shuffledOdds.slice(0, 5);
          return (
            <div className={classes.singleFixture} key={odd.fixture.id}>
              <p className={classes.fixtureName}>{odd.fixture.id}</p>
              {slicedOdds.map((bet) => {
                return (
                  <li className={classes.singleBet}>
                    <span className={classes.betName}>{bet.name}</span>
                    <span className={classes.betValues}>
                      {bet.values.map((value) => {
                        return (
                          <span className={classes.betValue}>
                            <span>{value.value}</span>
                            <span>&nbsp;-&nbsp;</span>
                            <span style={{ fontWeight: "bold" }}>
                              {value.odd}
                            </span>
                          </span>
                        );
                      })}
                    </span>
                  </li>
                );
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
}
