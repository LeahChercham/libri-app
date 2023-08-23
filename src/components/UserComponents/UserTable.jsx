import React from 'react'
import Header from './Header'
import { useUtilisateursContext } from '@/context/utilisateurs'
import { usePageContext } from '@/context/page'
import UserRow from './UserRow'

function UserTable() {
    const [utilisateurs, setUtilisateurs] = useUtilisateursContext()
    const [currentPage, setCurrentPage] = usePageContext()

    setCurrentPage(1)

    const utilisateursPerPage = 20;

    const indexOfLastUtilisateur = currentPage * utilisateursPerPage;
    const indexOfFirstUtilisateur = indexOfLastUtilisateur - utilisateursPerPage;

    let currentUtilisateurs
    let totalPages
    if (utilisateurs) {
        currentUtilisateurs = utilisateurs.slice(indexOfFirstUtilisateur, indexOfLastUtilisateur)
        totalPages = Math.ceil(utilisateurs.length / utilisateursPerPage)
    } else {
        currentUtilisateurs = null
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
                    {utilisateurs ? currentUtilisateurs.map((u) => (
                        <UserRow key={u.UID} utilisateur={u} />
                    )) : <tr>Pas d'utilisateurs enregistrés pour cette bibliothèque</tr>}

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
export default UserTable