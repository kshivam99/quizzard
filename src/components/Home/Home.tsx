import React from "react";
import "./Home.css";
import { categories, Topic } from "./quiz.categories";
import { Link } from "react-router-dom";
import { CircularProgress, TextField } from "@material-ui/core";
import { useTheme } from "../../contexts/themeContext";


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
  const [ loading, setLoading ] = React.useState(false);

  React.useEffect(()=>{
    categories(setCategory, setLoading);
  },[])

  return (
    <div
    className={
      theme === "Dark" ? " home--body dark--header" : " home--body light--headers"
    }>
      <div className={theme === "Dark"?"dark--header home--searchbar":"light--header home--searchbar"}>
      <TextField id="outlined-basic" label="Search Quiz" fullWidth variant="outlined" />
      </div>
      {loading && (
        <CircularProgress
          style={{ margin: "10rem auto", width: "10rem", height: "10rem" }}
        />
      )}
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
