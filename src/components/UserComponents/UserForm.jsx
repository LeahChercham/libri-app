import React, { useState } from 'react';
import Axios from 'axios';
import consts from '../../consts'
import { Input, Button } from '@mui/material'
const CREATE_ROUTE = consts.CREATE_ROUTE

const style = {
    container: {
        display: 'flex',
        flexDirection: "column",
        padding: "1em"
    },
    input: {
        padding: "1em",
        margin: "1em"
    },
    tooLongText: {
        fontSize: "x-large",
        color: 'red',
        padding: "1em",
    }
}

function UserForm() {
    const [userData, setUserData] = useState({
        adresse: '',
        codepostal: '',
        ville: '',
        email: '',
        anniversaire: '',
        telephone: '',
        prenom: '',
        nom: ''
    });

    const [showTooLongText, setShowTooLongText] = useState({ show: false, text: "" })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const maxLengthCheck = (object) => {
        if (object.target.value.length >= object.target.maxLength) {
            setShowTooLongText({ show: true, text: `Longueur maximale ${object.target.maxLength} pour ${object.target.name} atteinte` })
            object.target.value = object.target.value.slice(0, object.target.maxLength)
            return
        }
        setShowTooLongText({ show: false, text: "" })
    }


    const handleSaveUser = async () => {


        try {

            let userResponse = await Axios.post(CREATE_ROUTE('utilisateur'), {
                adresse: userData.adresse,
                codepostal: userData.codepostal,
                ville: userData.ville,
                email: userData.email,
                anniversaire: userData.anniversaire,
                telephone: userData.telephone,
                prenom: userData.prenom,
                nom: userData.nom
            })
            if (userResponse) {
                console.log('User saved successfully!');
                window.alert("Enregistrement réussi")
                setUserData({
                    adresse: '',
                    codepostal: '',
                    ville: '',
                    email: '',
                    anniversaire: '',
                    telephone: '',
                    prenom: '',
                    nom: ''
                })

            } else {
                console.error('Error saving user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={style.container}>
            <h2>Ajouter un utilisateur</h2>
            <input
                type="text"
                name="prenom"
                placeholder="Prenom"
                value={userData.prenom}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck}
                style={style.input}
            />
            <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={userData.nom}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck} style={style.input}
            />
            <input
                type="text"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck} style={style.input}
            />
            <input
                type="text"
                name="telephone"
                placeholder="Numéro de téléphone"
                value={userData.telephone}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck} style={style.input}
            />
            <input
                type="text"
                name="adresse"
                placeholder="Adresse"
                value={userData.adresse}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck} style={style.input}
            />
            <input
                type="text"
                name="codepostal"
                placeholder="Codepostal"
                value={userData.codepostal}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck} style={style.input}
            />
            <input
                type="text"
                name="ville"
                placeholder="Ville"
                value={userData.ville}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck} style={style.input}
            />
            <input
                type="date"
                name="anniversaire"
                placeholder="Anniversaire"
                value={userData.anniversaire}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck} style={style.input}
            />

            {showTooLongText.show ? <div style={style.tooLongText}>{showTooLongText.text}</div> : <div></div>}

            <Button onClick={handleSaveUser}>Enregistrer</Button>
        </div>
    );
}

export default UserForm;
