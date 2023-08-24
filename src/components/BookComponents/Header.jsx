import React from 'react';

function Header({ isAdmin }) {
    return (
        <tr className="booksHeader">
            <th>Image</th>
            <th>Identifiant</th>
            <th>Titre</th>
            <th>Année</th>
            <th>Nombre de pages</th>
            <th>Auteur</th>
            {isAdmin && (
                <>
                    <th>Modify</th>
                    <th>Delete</th>
                </>
            )}
        </tr>
    );
}

export default Header;
