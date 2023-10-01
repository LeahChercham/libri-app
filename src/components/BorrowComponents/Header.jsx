import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <tr className="borrowHeader" >
                <th>Identifiant</th>
                <th>Statut</th>
                <th>Date de l'emprunt</th>
                <th>Date de retour prévu </th>
                <th>Date de retour réel</th>
                <th>Option</th>
                <th>Option</th>
                <th>Utilisateur</th>
                <th>Livres empruntés</th>

            </tr>

        );
    }
}

export default Header;