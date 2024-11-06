import React, { useState, useEffect } from "react";
import classes from "./ResultContainer.module.css";
import { Link } from "react-router-dom";
import ResultBar from "../ResultBar/ResultBar";
import { useFixturesLiveData } from "../../../hooks/useFixturesLiveData";

const getRandomFixtures = (fixtures, count) => {
  let shuffled = [...fixtures];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
};

export default function ResultContainer() {
  const { data: fixturesData, isLoading, error } = useFixturesLiveData();
  const [displayedFixtures, setDisplayedFixtures] = useState([]);

  useEffect(() => {
    console.log(fixturesData); // Sprawdź strukturę danych

    if (
      fixturesData &&
      fixturesData.response &&
      Array.isArray(fixturesData.response)
    ) {
      const limitedFixtures =
        fixturesData.response.length > 20
          ? getRandomFixtures(fixturesData.response, 20)
          : fixturesData.response;
      setDisplayedFixtures(limitedFixtures);
    }
  }, [fixturesData]);

  if (isLoading) return <div>Ładowanie wyników...</div>;
  if (error) return <div>Błąd: {error.message}</div>;

  return (
    <div className={classes.currentResultsList}>
      {displayedFixtures.map((fixture, index) => {
        const className = index % 2 === 0 ? "even" : "odd";
        return (
          <Link
            className="disablingLinks"
            to={`/match/${fixture.fixture.id}`}
            key={fixture.fixture.id}
          >
            <ResultBar fixture={fixture} className={className} />
          </Link>
        );
      })}
    </div>
  );
}
