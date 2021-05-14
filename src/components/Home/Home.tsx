import React from "react";
import "./Home.css";
import { Input, InputGroup } from "@chakra-ui/react";
import { categories } from "./quiz.categories";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home--body">
      <div className="home--searchbar">
        <InputGroup>
          <Input placeholder="Search topics for quizzes" size="lg" />
        </InputGroup>
      </div>
      <div className="home--grid">
        {categories.map((item) => (
          <Link to={`/quizzes/${item.id}`}>
            <h1>{item.name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
