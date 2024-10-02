import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import { useQuery } from "@tanstack/react-query";
import LeaguesPage from "./pages/LeaguesPage/LeaguesPage";
import SingleLeaguePage from "./pages/SingleLeaguePage/SingleLeaguePage";

const App = () => {
  return (
    <div className="container">
      <div className="app">
        <Header />
        <SingleLeaguePage />
      </div>
    </div>
  );
};

export default App;
