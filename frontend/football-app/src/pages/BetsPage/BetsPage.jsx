import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./BetsPage.module.css";
import { useOddsData } from "../../hooks/useOddsData";
import OddsFixture from "../../components/OddsFixture/OddsFixture";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

export default function BetsPage() {
  const { data: oddsLive, isLoading, error } = useOddsData();

  if (isLoading) return <Loader />;
  if (error) return <p>Błąd podczas ładowania danych.</p>;

  const randomOdds = oddsLive.response
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  return (
    <main>
      <NavMenu />
      <div className={classes.betsPage}>
        {randomOdds.map((odd) => {
          const shuffledOdds = odd.odds.sort(() => 0.5 - Math.random());
          const slicedOdds = shuffledOdds.slice(0, 5);

          return (
            <Link className="disablingLinks" to={`/match/${odd.fixture.id}`}>
              <OddsFixture
                key={odd.fixture.id}
                fixture={odd.fixture}
                slicedOdds={slicedOdds}
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
