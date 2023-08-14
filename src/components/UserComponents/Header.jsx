import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <tr className="userHeader" >
                <th>Identifiant</th>
                <th>Nom</th>
                <th>Prénom </th>
                <th>Adresse</th>
                <th>CP</th>
                <th>Ville</th>
                <th>Numéro</th>
                <th>Email</th>
                <th>Livres empruntés</th>
                <th>Date de prochain retour</th>
                
            </tr>

        );
    }
}

export default Header;