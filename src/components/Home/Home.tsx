import React from "react";
import "./Home.css";
import { categories, Topic } from "./quiz.categories";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { useTheme } from "../../contexts/themeContext";
import axios from "axios";


type QuizProps = {
  name: string;
};

const QuizItem: React.FC<{name: string}> = ({ name }: QuizProps) => {
  return (
    <div className="quiz--card">
      <div className="outline">
        <h1>{name}</h1>
      </div>
    </div>
  );
};

function Home() {
  const { theme } = useTheme();
  const [ category, setCategory ] = React.useState<Topic[]>([]);

  React.useEffect(()=>{
    categories(setCategory);
  },[])

  return (
    <div
    className={
      theme === "Dark" ? " home--body dark--header" : " home--body light--headers"
    }>
      <div className={theme === "Dark"?"dark--header home--searchbar":"light--header home--searchbar"}>
      <TextField id="outlined-basic" label="Search Quiz" fullWidth variant="outlined" />
      </div>
      <div className="home--grid">
        {category && category.map((item: Topic) => (
          <Link className="link" to={`/quizzes/${item._id}`}>
            <h1>
              <QuizItem name={item.topic} />
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
