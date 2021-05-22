import React from "react";
import { QuestionsState } from "./getQuiz";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { useTheme, Theme } from "../../contexts/themeContext";
import "./Result.css";

type ResultProps = {
  questions: QuestionsState[];
  responses: string[];
  score: number;
  startQuiz: () => void;
};

function Result({ questions, responses, score, startQuiz }: ResultProps) {
  const { theme } = useTheme();

  return (
    <div className="result--container">
      <h1>You scored {(score * 100).toFixed(2)}%</h1>
      <hr style={{width:"80vw", marginBottom:"2rem"}}/>
      {questions.map((que, index) => (
        <>
          <h1 className="question">
            {index + 1}. {que.question}
          </h1>
          <ol>
            {que.answers.map((opt) => (
              <div style={{ display: "flex", alignItems:"center"}}>
                <li
                  style={{
                    color:
                      opt === que.correct_answer
                        ? "green"
                        : opt === responses[index]
                        ? "red"
                        : theme === Theme.Dark
                        ? "#fff"
                        : "#000",
                  }}
                >
                  {opt}
                </li>
                {opt === responses[index] && opt !== que.correct_answer && (
                  <ImCross className="icon" color="red" size={24}/>
                )}
                {opt === responses[index] && opt === que.correct_answer && (
                  <FaCheck className="icon" color="green" size={24}/>
                )}
              </div>
            ))}
            <h4 className="explanation">Explanation:</h4>
            <p>{que.explanation}</p>
          </ol>
        </>
      ))}
      <button onClick={startQuiz}>Try Again</button>
    </div>
  );
}

export default Result;
