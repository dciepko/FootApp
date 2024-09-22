import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import { useQuery } from "@tanstack/react-query";

const App = () => {
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
