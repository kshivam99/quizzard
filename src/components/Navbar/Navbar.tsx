import React from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme, Theme } from "../../contexts/themeContext";
import Switch from '@material-ui/core/Switch';
import { useAuth } from "../../contexts/authContext";

const Navbar: React.FC = () => {
  const [showDropDownNav, setShowDropDownNav] = useState(false);
  const { theme, setTheme } = useTheme();
  const { auth } = useAuth();

  function handleMenuIconClick() {
    setShowDropDownNav((prev) => !prev);
  }
  
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

      <ul style={{backgroundColor:theme === "Dark" ? "#151515":"#fff"}} className={!showDropDownNav ? "menu" : "menu active"}>
        <Link className="link" to="/quizzes" onClick={handleMenuIconClick}>
        {auth && <li className={theme === "Dark" ? "dark" : "light"}>Quizzes</li>}
        </Link>
        <Link className="link" to="/components" onClick={handleMenuIconClick}>
        {auth &&  <li className={theme === "Dark" ? "dark" : "light"}>HighScores</li>}
        </Link>
        <Link  className="link" to="/logout">
        {auth && <li className={theme === "Dark" ? "dark" : "light"}>Sign out</li>}
        </Link>
        <Switch
          defaultChecked
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
