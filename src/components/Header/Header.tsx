import React from "react";
import "./Header.css";
import Button from "@material-ui/core/Button";
import { MdExplore } from "react-icons/md";
import { useTheme } from "../../contexts/themeContext";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { useAuth } from "../../contexts/authContext";

function SignIn() {
  
  return (
    <Link className="link" to="/login">
    <Button
      color="primary"
      variant="contained"
      endIcon={<BiLogIn />}
    >
      Sign In
    </Button>
    </Link>
  );
}

const Header: React.FC = () => {
  const { theme } = useTheme();
  const { auth } = useAuth();

  return (
    <div
      className={
        theme === "Dark" ? " header dark--header" : " header light--headers"
      }
    >
      <h1>
        Welcome to <span>Quizzard</span>
      </h1>
      <div className="small">
        <small>Do u really know JavaScript, I believe you dont!</small>
        <small>Start with any of the topic and test yourself</small>
      </div>
      {
        (auth ? (
          <Link className="link" to="/quizzes">
            <Button color="primary" variant="contained" endIcon={<MdExplore />}>
              Explore
            </Button>
          </Link>
        ) : (
          <SignIn />
        ))}
    </div>
  );
};

export default Header;
