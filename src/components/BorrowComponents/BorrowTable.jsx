import React from 'react'
import Header from './Header'
import { useBorrowsContext } from '@/context/borrows'
import { usePageContext } from '@/context/page'
import BorrowRow from './BorrowRow'

function BorrowTable() {
    const [borrows, setBorrows] = useBorrowsContext()
    const [currentPage, setCurrentPage] = usePageContext()

    setCurrentPage(1)

    const borrowsPerPage = 20;

    const indexOfLastBorrow = currentPage * borrowsPerPage;
    const indexOfFirstBorrow = indexOfLastBorrow - borrowsPerPage;

    let currentBorrows
    let totalPages
    if (borrows) {
        currentBorrows = borrows.slice(indexOfFirstBorrow, indexOfLastBorrow)
        totalPages = Math.ceil(borrows.length / borrowsPerPage)
    } else {
        currentBorrows = null
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
                <tbody>
                    {borrows ? currentBorrows.map((b) => (
                        <BorrowRow key={b.EID} borrow={b} />
                    )) : <tr>Pas d'borrows enregistrés pour cette bibliothèque</tr>}

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
    )
}
export default BorrowTable