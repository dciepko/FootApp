import ResultBar from "../../components/ResultBar/ResultBar";
import classes from "./HomePage.module.css";
import { useQuery } from "@tanstack/react-query";
import fixturesData from "../../data/fixtures.json";

const fetchFixtures = async () => {
  const url = "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ca33205c25msh1c3782cdb879e0ap1b6970jsnf69950db386a",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Error fetching the fixtures");
  }

  const result = await response.json();
  return result.response;
};

export default function HomePage() {
  // const { data, error, isLoading } = useQuery({
  //   queryFn: fetchFixtures,
  //   queryKey: ["fixtures"],
  // });

  console.log(fixturesData);

  return (
    <main>
      <nav className={classes.navMenu}>
        <ul>
          <li style={{ borderLeft: 0 }}>
            <button className={classes.navMenuOption}>Szukaj</button>
          </li>
          <li>
            <a href="#" className={classes.navMenuOption}>
              Rozgrywki
            </a>
          </li>
          <li>
            <a href="#" className={classes.navMenuOption}>
              Zawodnicy
            </a>
          </li>
          <li>
            <a href="#" className={classes.navMenuOption}>
              Porównaj
            </a>
          </li>
          <li>
            <a href="#" className={classes.navMenuOption}>
              Kursy
            </a>
          </li>
          <li style={{ borderRight: 0 }}>
            <a href="#" className={classes.navMenuOption}>
              Symulacje
            </a>
          </li>
        </ul>
      </nav>
      <section className={classes.mainSection}>
        <div className={classes.currentResultsContainer}>
          <div className={classes.currentResultsShape}>
            <div className={classes.currentResultsList}>
              {fixturesData &&
                fixturesData.map((fixture, index) => {
                  const className = index % 2 === 0 ? "even" : "odd";
                  return (
                    <ResultBar
                      key={fixture.fixture.id}
                      fixture={fixture}
                      className={className}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div className={classes.leaguesContainer}>
          <div className={classes.leaguesShape}>
            <div className={classes.leaguesList}></div>
          </div>
        </div>
        <div className={classes.additionalContainer}>
          <div className={classes.additionalShape}>
            <div className={classes.additionalContent}></div>
          </div>
        </div>
      </section>
    </main>
  );
}
