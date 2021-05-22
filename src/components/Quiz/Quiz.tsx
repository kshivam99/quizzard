import React, { useState, useEffect } from "react";
import "./Quiz.css";
import { useParams } from "react-router-dom";
import { quizData } from "./getQuiz";
import { QuestionsState } from "./getQuiz";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Result from "./Result";
import { useTheme } from "../../contexts/themeContext";
import CircularProgress from "@material-ui/core/CircularProgress";

function Quiz() {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string | undefined }>();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [response, setResponse] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setGameOver(false);
      const newQuestions = await quizData(id);
      setQuestions(newQuestions);
      setScore(0);
      setQuestionNumber(1);
      setLoading(false);
    })();
  }, []);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await quizData(id);
    setQuestions(newQuestions);
    setScore(0);
    setQuestionNumber(1);
    setLoading(false);
    setResponse([]);
  };

  const nextQuestion = (opt: string) => {
    const nextQ = questionNumber + 1;
    setResponse(prev=>prev.concat(opt));
    if (nextQ === TOTAL_QUESTIONS+1) {
      setGameOver(true);
    } else {
      setQuestionNumber(nextQ);
    }
  };


  const submitAnswer = (option: string, answer: string)  => {
    option === answer && setScore((prev) => prev + 1);
    nextQuestion(option);
  }

  let TOTAL_QUESTIONS: number = questions.length;
  let name: string = "";
  if(questions.length){
    name = questions[0].topic;
  }

  return (
    <div
      className={
        theme === "Dark"
          ? " quiz--body dark--header"
          : " quiz--body light--headers"
      }
    >
      <h1 className="quiz--title">{name!=="" && name}</h1>
      {loading && (
        <CircularProgress
          style={{ margin: "10rem auto", width: "10rem", height: "10rem" }}
        />
      )}
      {!loading &&
        !gameOver &&
        questions &&
        questions.map((item) => (
          <div
            style={{ display: questionNumber === item.id ? "" : "none" }}
            className="question--body"
          >
            <div className="question--header">
              <div className="question--number">{`${questionNumber}/${TOTAL_QUESTIONS}`}</div>
              <div className="time--left">
                <CountdownCircleTimer
                  key={questionNumber}
                  size={50}
                  strokeWidth={3}
                  isPlaying
                  duration={30}
                  colors={[
                    ["#10B981", 0.33],
                    ["#F7B801", 0.33],
                    ["#A30000", 0.33],
                  ]}
                  onComplete={() => {
                    nextQuestion("");
                    return [true, 0];
                  }}
                >
                  {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
              </div>
            </div>
            <p className="question">{item.question}</p>
            <div className="options">
              {item.answers.map((opt, index) => (
                <div
                  onClick={() => submitAnswer(opt, item.correct_answer)}
                >
                  <p>{index + 1}.</p>
                  <p>{opt}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      {!gameOver && !loading && questionNumber !== TOTAL_QUESTIONS ? (
        <button className="next" onClick={()=>nextQuestion("")}>
          Next Question
        </button>
      ) : null}
      {gameOver && <Result questions={questions} responses={response} score={score/TOTAL_QUESTIONS} startQuiz={startQuiz}/>}
    </div>
  );
}

export default Quiz;
