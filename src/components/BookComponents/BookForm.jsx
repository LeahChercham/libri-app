import React, { useState } from 'react';
import Axios from 'axios';
import consts from '../../consts'
const CREATE_ROUTE = consts.CREATE_ROUTE

function BookForm() {
    const [bookData, setBookData] = useState({
        titre: '',
        pages: '',
        lienimage: '',
        annee: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBookData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSaveBook = async () => {


        try {
            debugger

            let bookResponse = await Axios.post(CREATE_ROUTE('livres'), {
                titre: bookData.titre,
                pages: bookData.pages,
                lienimage: bookData.lienimage,
                annee: bookData.annee
            })
            if (bookResponse) {
                console.log('Book saved successfully!');
                let bookID = bookResponse.data.lid
                let authorResponse = await Axios.post(CREATE_ROUTE('auteur'), { prenom: bookData.auteur_prenom, nom: bookData.auteur_nom }) // verify variables

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
                    } else {
                        console.error('Error assigning Book and Author to LIVRE_AUTEUR');
                    }
                } else {
                    console.error('Error saving author')
                }
            } else {
                console.error('Error saving book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Add a New Book</h2>
            <input
                type="text"
                name="titre"
                placeholder="Title"
                value={bookData.titre}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="pages"
                placeholder="Pages"
                value={bookData.pages}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="lienimage"
                placeholder="Image URL"
                value={bookData.lienimage}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="annee"
                placeholder="Year"
                value={bookData.annee}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="auteur_prenom"
                placeholder="Author's First Name"
                value={bookData.auteur_prenom}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="auteur_nom"
                placeholder="Author's Last Name"
                value={bookData.auteur_nom}
                onChange={handleInputChange}
            />

            <button onClick={handleSaveBook}>Save Book</button>
        </div>
    );
}

export default BookForm;
