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
import SearchPage from "./pages/SearchPage/SearchPage";

const App = () => {
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
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/live",
          element: <LIVEPage />,
        },
        {
          path: "/leagues",
          element: <LeaguesPage />,
        },
        {
          path: "/compare",
          element: <ComparePage />,
        },
        {
          path: "/bets",
          element: <BetsPage />,
        },
        {
          path: "/simulations",
          element: <SimulationsPage />,
        },

        {
          path: "/league/:leagueId",
          element: <SingleLeaguePage />,
        },
        {
          path: "/team/:teamId",
          element: <TeamPage />,
        },
        {
          path: "/player/:playerId",
          element: <PlayerPage />,
        },
        {
          path: "/match/:matchId",
          element: <MatchPage />,
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
