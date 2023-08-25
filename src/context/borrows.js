import { createContext, useContext, useState } from "react";

const BorrowsContext = createContext(); // creates a new context object

export function BorrowsProvider({ children }) {
    const [borrows, setBorrows] = useState([]); // set initial value for the Context to an empty array of borrows

    return (
        <BorrowsContext.Provider value={[borrows, setBooks]}>
            {children}
        </BorrowsContext.Provider>
    );
}

export function useBorrowsContext() {
    return useContext(BorrowsContext);
}
