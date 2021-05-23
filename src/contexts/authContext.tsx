import React, { createContext, useContext, useState } from "react";


export type Auth = {
    token: string;
    user: object;
}


export type AuthContextType = {
    auth: Auth | null;
    setAuth: (auth: Auth) => void;
}

const AuthContext = createContext<AuthContextType>({ auth: null, setAuth: auth => console.log(auth) });;

export const AuthProvider:React.FC = ({children}) => {
    const [ auth, setAuth ] = useState(JSON.parse(localStorage.getItem("auth") || "null"));

    return(
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
  }
  