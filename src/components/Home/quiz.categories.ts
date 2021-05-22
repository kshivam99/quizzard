import axios from "axios";

export type Topic = {
    _id: string;
    topic: string;
  };

export const categories = async(setCategory: (topics: Topic[]) => void) => {
    const endpoint = `https://quizzard99.herokuapp.com/quizzes/topics`;
    const res = await axios.get(endpoint);
    setCategory(res.data);
  };

  