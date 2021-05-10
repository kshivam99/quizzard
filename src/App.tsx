import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Header />
      </Router>
    </div>
  );
};

export default App;
