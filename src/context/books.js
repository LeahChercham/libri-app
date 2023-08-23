import { createContext, useContext, useState } from "react";

const BooksContext = createContext(); // creates a new context object

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]); // set initial value for the Context to an empty array of books

  return (
    <BooksContext.Provider value={[books, setBooks]}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooksContext() {
  return useContext(BooksContext);
}
