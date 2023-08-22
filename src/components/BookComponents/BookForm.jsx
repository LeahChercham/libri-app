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

            let response = await Axios.post(CREATE_ROUTE('livres'), bookData)
            if (response.ok) {
                console.log('Book saved successfully!');
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
            <button onClick={handleSaveBook}>Save Book</button>
        </div>
    );
}

export default BookForm;
