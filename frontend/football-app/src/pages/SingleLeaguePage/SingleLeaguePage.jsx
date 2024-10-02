import NavMenu from "../../components/NavMenu/NavMenu";
import classes from "./SingleLeaguePage.module.css";
import leagues from "../../data/leagues.json";
import { useQuery } from "@tanstack/react-query";
import plSingle from "../../data/PLSingle.json";

const fetchLeagueData = async ({ queryKey }) => {
  const [_key, chosenLeagueId] = queryKey;
  console.log("weszlo");

  const url = `https://api-football-v1.p.rapidapi.com/v3/leagues?id=${chosenLeagueId}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ca33205c25msh1c3782cdb879e0ap1b6970jsnf69950db386a",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Error fetching the league's data");
  }

  const result = await response.json();
  console.log(result);
  return result.response;
};

export default function SingleLeaguePage({ chosenLeagueId = 39 }) {
  //   const { data, error, isLoading } = useQuery({
  //     queryFn: fetchLeagueData,
  //     queryKey: ["fixtures", chosenLeagueId],
  //   });

  const data = plSingle[0];
  console.log(data);

  return (
    <main>
      <NavMenu />
    </main>
  );
}
