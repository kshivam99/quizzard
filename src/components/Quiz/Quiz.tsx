import React, { useState, useEffect } from "react";
import "./Quiz.css";
import { useParams } from "react-router-dom";
import { quizData } from "./getQuiz";
import { QuestionsState } from "./getQuiz";
import firebase, { projectFirestore } from "../../firebase/config";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import Result from "./Result";
import { useTheme, Theme } from "../../contexts/themeContext";
import CircularProgress from "@material-ui/core/CircularProgress";

let TOTAL_QUESTIONS: number;

function Quiz() {
  const { theme, setTheme } = useTheme();
  const { id } = useParams<{ id: string | undefined }>();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [user] = useAuthState(auth);
  const [time, setTime] = useState(-1);

  // const name = categories.find(
  //   (item) => JSON.stringify(item.id) === JSON.stringify(id)
  // );

  useEffect(() => {
    (async () => {
      setLoading(true);
      setGameOver(false);
      const newQuestions = await quizData(id);
      setQuestions(newQuestions);
      TOTAL_QUESTIONS=questions.length;
      setScore(0);
      setQuestionNumber(1);
      setLoading(false);
    })();
  }, []);

  // useEffect(() => {
  //   setTime(30);
  // }, [questionNumber]);

  // useEffect((): any => {
  //   const clearInterval = setInterval(() => {
  //     setTime((prev) => prev - 1);
  //   }, 1000);
  //   return clearInterval;
  // }, []);

  // useEffect(() => {
  //   if (time === 0) {
  //     nextQuestion();
  //   }
  // }, [time]);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await quizData(id);
    setQuestions(newQuestions);
    setScore(0);
    setQuestionNumber(1);
    setLoading(false);
  };

  // function postData() {
  //   projectFirestore.collection(`highscores`).add({
  //     user: user?.uid,
  //     quizzes: [
  //       {
  //         id: id,
  //         highscore: score,
  //       },
  //     ],
  //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //   });
  // }

  const nextQuestion = () => {
    const nextQ = questionNumber + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionNumber(nextQ);
    }
  };

  console.log("question h ye", questions);
  return (
    <div
      className={
        theme === "Dark"
          ? " quiz--body dark--header"
          : " quiz--body light--headers"
      }
    >
      {/* <h1 className="quiz--title">{name?.topic}</h1> */}

      {!gameOver ? <p className="score">Score: {score}</p> : null}
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
                    nextQuestion();
                    return [true, 0];
                  }}
                >
                  {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
              </div>
            </div>
            <p
              className="question"
              dangerouslySetInnerHTML={{ __html: item.question }}
            />
            <div className="options">
              {item.answers.map((opt, index) => (
                <div
                  onClick={() => {
                    opt === item.correct_answer && setScore((prev) => prev + 1);
                    nextQuestion();
                  }}
                >
                  <p>{index + 1}.</p>
                  <p>{opt}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      {!gameOver && !loading && questionNumber !== TOTAL_QUESTIONS ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
      {gameOver && (
        <>
          <p>Yay! you scored {score} out of 10</p>
          <button onClick={startQuiz}>Try Again</button>
        </>
      )}
    </div>
  );
}

export default Quiz;
