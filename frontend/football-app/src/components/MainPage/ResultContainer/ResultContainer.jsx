import classes from "./ResultContainer.module.css";
import { useQuery } from "@tanstack/react-query";
import fixturesData from "../../../data/fixtures.json";
import ResultBar from "../ResultBar/ResultBar";

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

export default function ResultContainer() {
  // const { data, error, isLoading } = useQuery({
  //   queryFn: fetchFixtures,
  //   queryKey: ["fixtures"],
  // });

  return (
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
  );
}
