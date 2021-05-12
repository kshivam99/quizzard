import React from "react";
import "./Header.css";
import { Button, Input } from "@chakra-ui/react";
import { MdExplore } from "react-icons/md";
import { useTheme } from "../../contexts/themeContext";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className={
        theme === "Dark" ? " header dark--header" : " header light--headers"
      }
    >
      <h1>
        Welcome to <span>Quizzard</span>
      </h1>
      <small>Start Quizzing from any of the topics</small>
      <Link to="/quizzes">
        <Button colorScheme="blood" size="lg" rightIcon={<MdExplore />}>
          Explore{" "}
        </Button>
      </Link>
    </div>
  );
};

export default Header;
