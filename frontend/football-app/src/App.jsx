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

const App = () => {
  return (
    <div className="container">
      <div className="app">
        <RegisterPage />
      </div>
    </div>
  );
};

export default App;
