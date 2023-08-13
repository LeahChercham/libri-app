import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <tr className="booksHeader" >
                <th>Image</th>
                <th>Titre</th>
                <th>Auteurs </th>
                <th>Année</th>
                <th>Langue</th>
                <th>Pays</th>
                <th>Nombre de pages</th>
                <th>En savoir plus</th>
                <th>Disponibilité</th>
                <th>Date de retour</th>
                <th>Emprunteur</th>
            </tr>

        );
    }
}

export default Header;