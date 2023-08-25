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

function BookForm() {
    const [bookData, setBookData] = useState({
        titre: '',
        pages: '',
        lienimage: '',
        annee: '',
        auteurs: []
    });

    const [showTooLongText, setShowTooLongText] = useState({ show: false, text: "" })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBookData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddAuthor = () => {
        setBookData((prevData) => ({
            ...prevData,
            auteurs: [...prevData.auteurs,
            { prenom: '', nom: '' }]
        }))
    }


    const handleAuthorInputChange = (index, event) => {
        const { name, value } = event.target;

        setBookData((prevData) => {
            const auteurs = [...prevData.auteurs]
            auteurs[index] = {
                ...auteurs[index], // Copy the existing author object
                [name]: value // Update the specific property
            };
            return { ...prevData, auteurs }
        })

    }

    const maxLengthCheck = (object) => {
        if (object.target.value.length >= object.target.maxLength) {
            setShowTooLongText({ show: true, text: `Longueur maximale ${object.target.maxLength} pour ${object.target.name} atteinte` })
            object.target.value = object.target.value.slice(0, object.target.maxLength)
            return
        }
        setShowTooLongText({ show: false, text: "" })
    }


    const handleSaveBook = async () => {


        try {

            let bookResponse = await Axios.post(CREATE_ROUTE('livres'), {
                titre: bookData.titre,
                pages: bookData.pages,
                lienimage: bookData.lienimage,
                annee: bookData.annee
            })
            if (bookResponse) {
                console.log('Book saved successfully!');
                let bookID = bookResponse.data.lid
                for (const author of bookData.auteurs) {
                    let authorResponse = await Axios.post(CREATE_ROUTE('auteur'), { prenom: author.prenom, nom: author.nom })

                    if (authorResponse) {
                        console.log('Author saved successfully!')
                        let authorID = authorResponse.data.aid

                        // Now assign the book and author to LIVRE_AUTEUR
                        let assignResponse = await Axios.post(CREATE_ROUTE('livreauteur'), {
                            livre_lid: bookID,
                            auteur_aid: authorID
                        });

                        if (assignResponse) {
                            console.log("book and author assigned to LIVRE_AUTEUR");
                            window.alert("Enregistrement réussi")
                            setBookData({
                                titre: '',
                                pages: '',
                                lienimage: '',
                                annee: '',
                                auteurs: []
                            })

                        } else {
                            console.error('Error assigning Book and Author to LIVRE_AUTEUR');
                        }
                    } else {
                        console.error('Error saving author')
                    }
                }
            } else {
                console.error('Error saving book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={style.container}>
            <h2>Add a New Book</h2>
            <input
                type="text"
                name="titre"
                placeholder="Titre"
                value={bookData.titre}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck}
                style={style.input}
            />
            <input
                type="number"
                name="pages"
                placeholder="Pages"
                value={bookData.pages}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck} style={style.input}
            />
            <input
                type="text"
                name="lienimage"
                placeholder="Image URL"
                value={bookData.lienimage}
                onChange={handleInputChange}
                maxLength="4000" onInput={maxLengthCheck} style={style.input}
            />
            <input
                type="text"
                name="annee"
                placeholder="Année de publication"
                value={bookData.annee}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck} style={style.input}
            />


            {bookData.auteurs.map((author, index) => ( // for more authors
                <div key={index}>
                    <input
                        type="text"
                        name={`prenom`}
                        placeholder="Prénom de l'auteur"
                        value={author.prenom}
                        onChange={(event) => handleAuthorInputChange(index, event)}
                        maxLength="240" onInput={maxLengthCheck} style={style.input}
                    />
                    <input
                        type="text"
                        name={`nom`}
                        placeholder="Nom de l'auteur"
                        value={author.nom}
                        onChange={(event) => handleAuthorInputChange(index, event)}
                        maxLength="240" onInput={maxLengthCheck} style={style.input}
                    />
                </div>

            ))}

            {showTooLongText.show ? <div style={style.tooLongText}>{showTooLongText.text}</div> : <div></div>}

            <Button onClick={handleAddAuthor}>Ajouter un auteur</Button>
            <Button onClick={handleSaveBook}>Enregistrer</Button>
        </div>
    );
}

export default BookForm;
