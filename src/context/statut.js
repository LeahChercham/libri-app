import { createContext, useContext, useState } from "react";

const StatutContext = createContext();

export function StatutProvider({ children }) {
    const [statut, setStatut] = useState("");

    return (
        <StatutContext.Provider value={[statut, setStatut]}>
            {children}
        </StatutContext.Provider>
    );
}

export function useStatutContext() {
    return useContext(StatutContext);
}