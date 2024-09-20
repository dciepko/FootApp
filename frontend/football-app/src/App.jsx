import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import { useQuery } from "@tanstack/react-query";

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

const App = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: fetchFixtures,
    queryKey: ["fixtures"],
  });
  //const { response } = data;

  console.log(data);
  return (
    <div className="container">
      <div className="app">
        <Header />
        <HomePage />
      </div>
    </div>
  );
};

export default App;
