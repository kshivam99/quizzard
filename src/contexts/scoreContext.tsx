import React, { createContext, useContext, useState } from "react";


export type Score = {
    topic: string;
    user: string;
    score: number;
}


export type ScoreContextType = {
    scores: Score[];
    setScores: (scores: Score[]) => void;
}

const ScoreContext = createContext<ScoreContextType>({ scores: [], setScores: scores => console.log(scores) });;

export const ScoreProvider:React.FC = ({children}) => {
    const [ scores, setScores ] = useState(JSON.parse(localStorage.getItem("score") || "null"));

    return(
        <ScoreContext.Provider value={{ scores, setScores }}>
            {children}
        </ScoreContext.Provider>
    );
}

export function useScore() {
    return useContext(ScoreContext);
  }
  