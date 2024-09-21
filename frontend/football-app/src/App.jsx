import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";

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
