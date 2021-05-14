import React from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Switch } from "@chakra-ui/react";
import { useTheme, Theme } from "../../contexts/themeContext";


const Navbar: React.FC = () => {
  const [showDropDownNav, setShowDropDownNav] = useState(false);
  const { theme, setTheme } = useTheme();

  function handleMenuIconClick() {
    setShowDropDownNav((prev) => !prev);
  }

  console.log(theme);
  return (
    <div className={theme==="Dark"?"nav dark":"nav light"}>
      <div className="menu-icon" onClick={handleMenuIconClick}>
        {!showDropDownNav ? <FaBars /> : <FaTimes />}
      </div>
      <Link className="link" to="/" onClick={()=>setShowDropDownNav(false)}>
        <h2 className={theme==="Dark"?"dark":"light"}><span>Q</span>uizzard</h2>
      </Link>

      <ul className={!showDropDownNav ? "menu" : "menu active"}>
        <Link className="link" to="/" onClick={handleMenuIconClick}>
          <li className={theme==="Dark"?"dark":"light"}>Quizzes</li>
        </Link>
        <Link className="link" to="/components"onClick={handleMenuIconClick}>
          <li className={theme==="Dark"?"dark":"light"}>HighScores</li>
        </Link>
        <Switch onChange={()=>setTheme(theme===Theme.Dark?Theme.Light:Theme.Dark)} colorScheme="blood" size="lg" style={{margin:"0 1rem"}} />
      </ul>
    </div>
  );
}

export default Navbar;
