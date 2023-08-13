import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <tr className="booksHeader" >
                <th>Titre</th>
                <th>Auteurs</th>
                <th>Année</th>
                <th>Pays</th>
                <th>Disponibilité</th>
                <th>Date de retour</th>
                <th>Emprunteur</th>
            </tr>

        );
    }
}

export default Header;