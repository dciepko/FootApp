import classes from "./ResultContainer.module.css";
import { useQuery } from "@tanstack/react-query";
import fixturesData from "../../../data/fixtures.json";
import ResultBar from "../ResultBar/ResultBar";
import { Link } from "react-router-dom";

// Funkcja pomocnicza do losowego wyboru 20 elementów z tablicy
const getRandomFixtures = (fixtures, count) => {
  // Kopia tablicy
  let shuffled = [...fixtures];
  // Algorytm Fisher-Yates do mieszania tablicy
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  // Zwracamy tylko 'count' pierwszych elementów
  return shuffled.slice(0, count);
};

export default function ResultContainer() {
  // const { data, error, isLoading } = useQuery({
  //   queryFn: fetchFixtures,
  //   queryKey: ["fixtures"],
  // });

  // Sprawdzenie długości danych i wybór odpowiedniej ilości meczów
  const fixturesToDisplay =
    fixturesData.length <= 20
      ? fixturesData
      : getRandomFixtures(fixturesData, 20);

  return (
    <div className={classes.currentResultsList}>
      {fixturesToDisplay.map((fixture, index) => {
        const className = index % 2 === 0 ? "even" : "odd";
        return (
          <Link
            className="disablingLinks"
            to={"/match"}
            key={fixture.fixture.id}
          >
            <ResultBar fixture={fixture} className={className} />
          </Link>
        );
      })}
    </div>
  );
}
