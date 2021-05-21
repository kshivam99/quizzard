import React from "react";
import "./Header.css";
import firebase from "firebase/app";
import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "@material-ui/core/Button";
import { MdExplore } from "react-icons/md";
import { useTheme } from "../../contexts/themeContext";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function SignIn() {
  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <Button
      color="primary"
      variant="contained"
      onClick={googleSignIn}
      endIcon={<FcGoogle />}
    >
      Sign In
    </Button>
  );
}

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [user, loading] = useAuthState(auth);
  console.log(user?.uid);
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
      {!loading &&
        (user ? (
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
