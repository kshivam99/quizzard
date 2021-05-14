import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Quiz from "./components/Quiz/Quiz";
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
          <Route exact path="/quizzes">
            <Home />
          </Route>
          <Route path="/quizzes/:id">
            <Quiz />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
