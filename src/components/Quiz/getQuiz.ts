import { shuffleArray } from './utils';

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionsState = Question & { answers: string[], id: number };

export const quizData = async (id: string | undefined): Promise<QuestionsState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question, index: number) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer]), id: index+1
  }))
};
