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
