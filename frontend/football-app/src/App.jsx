import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LeaguesPage from "./pages/LeaguesPage/LeaguesPage";
import SingleLeaguePage from "./pages/SingleLeaguePage/SingleLeaguePage";
import PlayerPage from "./pages/PlayerPage/PlayerPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TeamPage from "./pages/TeamPage/TeamPage";
import MatchPage from "./pages/MatchPage/MatchPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BetsPage from "./pages/BetsPage/BetsPage";
import ComparePage from "./pages/ComparePage/ComparePage";
import LIVEPage from "./pages/LIVEPage/LIVEPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ErrorBoundary from "./errors/ErrorBoundary";
import PageNotFound from "./errors/PageNotFound/PageNotFound";
import GlobalError from "./errors/GlobalError";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const router = createBrowserRouter([
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    {
      path: "/",
      element: <Header />,
      id: "root",
      errorElement: <GlobalError />,
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
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <div className="container">
      <div className="app">
        <AuthProvider>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </AuthProvider>
      </div>
    </div>
  );
};

export default App;
