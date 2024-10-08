import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import { useQuery } from "@tanstack/react-query";
import LeaguesPage from "./pages/LeaguesPage/LeaguesPage";
import SingleLeaguePage from "./pages/SingleLeaguePage/SingleLeaguePage";
import PlayerPage from "./pages/PlayerPage/PlayerPage";

const App = () => {
  return (
    <div className="container">
      <div className="app">
        <Header />
        <PlayerPage />
      </div>
    </div>
  );
};

export default App;
