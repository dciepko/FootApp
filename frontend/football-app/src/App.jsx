import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import { useQuery } from "@tanstack/react-query";
import LeaguesPage from "./pages/LeaguesPage/LeaguesPage";
import SingleLeaguePage from "./pages/SingleLeaguePage/SingleLeaguePage";
import PlayerPage from "./pages/PlayerPage/PlayerPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NavMenu from "./components/NavMenu/NavMenu";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TeamPage from "./pages/TeamPage/TeamPage";
import MatchPage from "./pages/MatchPage/MatchPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BetsPage from "./pages/BetsPage/BetsPage";
import ComparePage from "./pages/ComparePage/ComparePage";
import SimulationsPage from "./pages/SimulationsPage/SimulationsPage";
import LIVEPage from "./pages/LIVEPage/LIVEPage";

const fetchFixtures = async () => {
  const url = "https://api-football-v1.p.rapidapi.com/v3/odds/live";
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

  const handleDownloadJSON = () => {
    if (!data) return;

    // Tworzenie Blob z danymi JSON
    const jsonData = JSON.stringify(data, null, 2); // Formatowanie JSON
    const blob = new Blob([jsonData], { type: "application/json" });

    // Tworzenie URL dla pliku
    const url = URL.createObjectURL(blob);

    // Tworzenie ukrytego elementu <a> do pobrania
    const link = document.createElement("a");
    link.href = url;
    link.download = "odds.json"; // Nazwa pliku
    document.body.appendChild(link);
    link.click();

    // Usuwanie tymczasowego linku
    link.remove();
  };

  //handleDownloadJSON();

  const router = createBrowserRouter([
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    {
      path: "/",
      element: <Header />,
      id: "root",
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: "/leagues",
          element: <LeaguesPage />,
        },
        {
          path: "/league",
          element: <SingleLeaguePage />,
        },
        {
          path: "/team",
          element: <TeamPage />,
        },
        {
          path: "/player",
          element: <PlayerPage />,
        },
        {
          path: "/match",
          element: <MatchPage />,
        },
        {
          path: "/bets",
          element: <BetsPage />,
        },
        {
          path: "/compare",
          element: <ComparePage />,
        },
        {
          path: "/simulations",
          element: <SimulationsPage />,
        },
        {
          path: "/live",
          element: <LIVEPage />,
        },
      ],
    },
  ]);

  return (
    <div className="container">
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
