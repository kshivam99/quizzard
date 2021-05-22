import { shuffleArray } from './utils';
import axios from "axios";

export type Question = {
  _id: string;
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  topic: string;
  explanation: string;
};

export type QuestionsState = Question & { answers: string[], id: number };

export const quizData = async (id: string | undefined): Promise<QuestionsState[]> => {
  const endpoint = `http://localhost:3001/quizzes/${id}`;
  const res = await axios.get(endpoint);
  return res.data.map((question: Question, index: number) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer]), id: index+1
  }))
};
