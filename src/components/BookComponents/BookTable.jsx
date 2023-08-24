import React, { useState } from 'react';
import Header from './Header';
import BookRow from './BookRow';
import { useBooksContext } from '@/context/books';
import { useUserContext } from '@/context/user';
import { usePageContext } from '@/context/page';

const initialPage = 1;

function BookTable() {

    
    const [currentPage, setCurrentPage] = usePageContext()
    setCurrentPage(1)

    const [books] = useBooksContext()
    console.log(books)

    const [user, setUser] = useUserContext()
    let isAdmin = false
    if (user.admin) {
        isAdmin = true
    } else { isAdmin = false }

    const booksPerPage = 20;

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;

    let currentBooks
    let totalPages
    if (books) {
        currentBooks = books.slice(indexOfFirstBook, indexOfLastBook)
        totalPages = Math.ceil(books.length / booksPerPage)
    } else {
        currentBooks = null
        totalPages = 1
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <table>
                <thead>
                    <Header />
                </thead>
                <tbody>  {books && books.length !== 0 ? currentBooks.map((book) => (
                    <BookRow key={book.LID} book={book} isAdmin={isAdmin} />
                )) : <tr><td>Pas de livres trouvés.</td></tr>}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                        (page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                disabled={currentPage === page}
                            >
                                {page}
                            </button>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default BookTable;
