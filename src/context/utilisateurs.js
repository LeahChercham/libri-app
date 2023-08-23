import { createContext, useContext, useState } from "react";

const Context = createContext() // creates a new context object

export function UtilisateursProvider({ children }) {
    const [utilisateurs, setUtilisateurs] = useState([]);

    return (
        <Context.Provider value={[utilisateurs, setUtilisateurs]}>{children}</Context.Provider>
    )
}

export function useUtilisateursContext() {
    return useContext(Context)
}