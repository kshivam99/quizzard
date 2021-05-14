import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { quizData } from "./getQuiz";
import { QuestionsState } from "./getQuiz";

const TOTAL_QUESTIONS = 10;

function Quiz() {
  const { id } = useParams<{ id: string | undefined }>();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await quizData(id);
    setQuestions(newQuestions);
    setScore(0);
    setQuestionNumber(1);
    setLoading(false);
    console.log(newQuestions);
  };

  const nextQuestion = () => {
    const nextQ = questionNumber + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionNumber(nextQ);
    }
  };

  console.log("inside quiz");

  return (
    <div style={{ marginTop: "6rem" }} className="quiz--body">
      <h1>REACT QUIZ</h1>
      {gameOver ? (
        <button className="start" onClick={startQuiz}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading ? <p>Loading Questions...</p> : null}
      {!loading &&
        !gameOver &&
        questions.map((item) => (
          <div style={{display:questionNumber===item.id?"":"none"}}>
              {questionNumber}
            <p
              style={{ margin: "2rem 0" }}
              dangerouslySetInnerHTML={{ __html: item.question }}
            />
            {item.answers.map((opt) => (
              <p
                dangerouslySetInnerHTML={{ __html: opt }}
                onClick={() => {
            
                  opt === item.correct_answer && setScore((prev) => prev + 1);
                  nextQuestion();
                }}
              />
            ))}
            {item.correct_answer}
          </div>
        ))}
      {!gameOver &&
      !loading &&
      questionNumber !== TOTAL_QUESTIONS ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  );
}

export default Quiz;
