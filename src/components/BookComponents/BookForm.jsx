import React, { useState } from 'react';
import Axios from 'axios';
import consts from '../../consts'
const CREATE_ROUTE = consts.CREATE_ROUTE

function BookForm() {
    const [bookData, setBookData] = useState({
        titre: '',
        pages: '',
        lienimage: '',
        annee: '',
        auteurs: []
    });

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


            {bookData.auteurs.map((author, index) => ( // for more authors
                <div key={index}>
                    <input
                        type="text"
                        name={`prenom`}
                        placeholder="Author's First Name"
                        value={author.prenom}
                        onChange={(event) => handleAuthorInputChange(index, event)}
                    />
                    <input
                        type="text"
                        name={`nom`}
                        placeholder="Author's Last Name"
                        value={author.nom}
                        onChange={(event) => handleAuthorInputChange(index, event)}
                    />
                </div>
            ))}

            <button onClick={handleAddAuthor}>Ajouter un auteur</button>
            <button onClick={handleSaveBook}>Save Book</button>
        </div>
    );
}

export default BookForm;
