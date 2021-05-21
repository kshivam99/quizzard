import React from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTheme, Theme } from "../../contexts/themeContext";
import { auth } from "../../firebase/config";
import Switch from '@material-ui/core/Switch';

const Navbar: React.FC = () => {
  const [showDropDownNav, setShowDropDownNav] = useState(false);
  const { theme, setTheme } = useTheme();
  const [user] = useAuthState(auth);

  function handleMenuIconClick() {
    setShowDropDownNav((prev) => !prev);
  }

  console.log(theme);
  return (
    <div className={theme === "Dark" ? "nav dark" : "nav light"}>
      <div className="menu-icon" onClick={handleMenuIconClick}>
        {!showDropDownNav ? <FaBars /> : <FaTimes />}
      </div>
      <Link className="link" to="/" onClick={() => setShowDropDownNav(false)}>
        <h2 className={theme === "Dark" ? "dark" : "light"}>
          <span>Q</span>uizzard
        </h2>
      </Link>

      <ul className={!showDropDownNav ? "menu" : "menu active"}>
        <Link className="link" to="/quizzes" onClick={handleMenuIconClick}>
          <li className={theme === "Dark" ? "dark" : "light"}>Quizzes</li>
        </Link>
        <Link className="link" to="/components" onClick={handleMenuIconClick}>
          <li className={theme === "Dark" ? "dark" : "light"}>HighScores</li>
        </Link>
        {user && <li onClick={() => auth.signOut()}>Sign out</li>}
        <Switch
          onChange={() =>
            setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark)
          }
          color="primary"
        />
      </ul>
    </div>
  );
};

export default Navbar;
