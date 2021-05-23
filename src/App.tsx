import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Quiz from "./components/Quiz/Quiz";
import Login from "./components/Login/SignIn";
import Join from "./components/Login/SignUp";
import Logout from "./components/Login/Logout";
import Footer from "./components/Footer/Footer";
import { useAuth } from "./contexts/authContext";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const App: React.FC = () => {
  const { auth } = useAuth();

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
          <Route path="/login">
            {auth ? <Redirect to="/" /> : <Login />}
            </Route>
          <Route path="/join">
            {auth ? <Redirect to="/" /> : <Join />}
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
      </Router>
      <Footer />
      <ToastContainer
        style={{ position: "fixed", bottom: "0", right: "1rem" }}
      />
    </div>
  );
};

export default App;
