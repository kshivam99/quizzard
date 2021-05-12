import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Switch>
          <Route exact path="/">
            <Header />
          </Route>
          <Route path="/quizzes">

          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
