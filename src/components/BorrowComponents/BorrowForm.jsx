import React, { useState } from 'react';
import Axios from 'axios';
import consts from '../../consts'
import { Input, Button } from '@mui/material'

// --- Start For Select
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import Async, { useAsync } from 'react-select/async'
import AsyncSelect from 'react-select/async';
import { useBooksContext } from '@/context/books';
// --- End For Select

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

function BorrowForm() {
    const [borrowData, setBorrowData] = useState({ // TODO 
        dateemprunt: '',
        dateretourprevu: '',
        dateretourreel: '',
        utilisateur_uid: '',
        statut_sid: '',
        livres: []
    });

    const [showTooLongText, setShowTooLongText] = useState({ show: false, text: "" })
    const [searchString, setSearchString] = useState("")
    const [books, setBooks] = useBooksContext()
    const [options, setOptions] = useState([])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBorrowData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddBook = () => {
        setBorrowData((prevData) => ({
            ...prevData,
            livres: [...prevData.livres,
            { titre: '', autheur: '' }]
        }))
    }



    const maxLengthCheck = (object) => {
        if (object.target.value.length >= object.target.maxLength) {
            setShowTooLongText({ show: true, text: `Longueur maximale ${object.target.maxLength} pour ${object.target.name} atteinte` })
            object.target.value = object.target.value.slice(0, object.target.maxLength)
            return
        }
        setShowTooLongText({ show: false, text: "" })
    }


    const handleSaveBorrow = async () => {


        try {

            let borrowResponse = await Axios.post(CREATE_ROUTE('emprunt'), { // TO DO 
                dateemprunt: borrowData.dateemprunt,
                dateretourprevu: borrowData.dateretourprevu,
                dateretourreel: borrowData.dateretourreel,
                utilisateur_uid: borrowData.utilisateur_uid,
                statut_sid: borrowData.statut_sid,
                livres: borrowData.livres,
            })
            if (borrowResponse) {
                console.log('Emprunt saved successfully!');
                window.alert("Enregistrement réussi")
                setBorrowData({ // TO DO EMPTY STATE OF BORROW
                    dateemprunt: '',
                    dateretourprevu: '',
                    dateretourreel: '',
                    utilisateur_uid: '',
                    statut_sid: '',
                    livres: []
                })

            } else {
                console.error('Error saving emprunt');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };




    const searchBook = async (inputValue) => {

        console.log("searching" + inputValue)
        if (inputValue) {
            try {
                const response = await Axios.get(CREATE_ROUTE(`livre/recherche?search_string=${inputValue}`))
                console.log(response)
                if (response.status === 200) { // Check for a successful status code
                    console.log('Books fetched successfully!');
                    console.log(response)
                    const books = response.data.books; // Assuming response.data.rows contains the books array
                    //  setBooks(books); // Update the books context with fetched data
                    let newOptions = books.map((b) => ({ value: b.LID, label: `${b.TITRE} - ${b.AUTHORS}` }))
                    setOptions(newOptions)
                    console.log(options)
                    return options
                } else {
                    console.error('Error fetching books');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            getBooks()
        }

    }

    const getBooks = async () => {

        try {
            const response = await Axios.get(CREATE_ROUTE('livres_with_authors'));
            console.log(response)
            if (response.status === 200) { // Check for a successful status code
                console.log('Books fetched successfully!');
                console.log(response)
                const books = response.data.books; // Assuming response.data.rows contains the books array
                //setBooks(books); // Update the books context with fetched data
                let newOptions = books.map((b) => ({ value: b.LID, label: `${b.TITRE} - ${b.AUTHORS}` }))
                setOptions(newOptions)
                console.log(options)
                return options
            } else {
                console.error('Error fetching books');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={style.container}>
            <h2>Ajouter un emprunt</h2>
            <input
                type="text"
                name="dateemprunt"
                placeholder="Date de l'emprunt"
                value={borrowData.dateemprunt}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck}
                style={style.input}
            />
            <input
                type="text"
                name="dateretourprevu"
                // automatically filled (+30 days)
                placeholder="Date de retour prévu"
                value={borrowData.dateretourprevu}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck} style={style.input}
            />

            <input
                type="text"
                name="dateretourreel"
                // automatically filled (+30 days)
                placeholder="Date de retour réel"
                value={borrowData.dateretourreel}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck} style={style.input}
            />

            {/* Utilisateur dropdown */}

            {/* {borrowData.livres.map((livre, index) => (
                <div key={index}>
                    {/* create dropdown selector with books / search by name (title, author) 
                    <AsyncSelect
                        // loadOptions={loadOptions}
                        options={books}
                        onChange={handleBookChange}
                        // components={animatedComponents}
                        isMulti
                        closeMenuOnSelect={false}
                        closeMenuOnScroll={false}
                    />

 */}

            <AsyncSelect
                name="books"
                multi={true}
                // value={}
                loadOptions={searchBook}
                // options={options}
                closeMenuOnSelect={false}
                closeMenuOnScroll={false}
            />


            {showTooLongText.show ? <div style={style.tooLongText}>{showTooLongText.text}</div> : <div></div>}

            <Button onClick={handleAddBook}>Ajouter un livre à l'emprunt</Button>
            {/* Create dropdown and search to add book + Implement same logic as Authors for Books form*/}
            <Button onClick={handleSaveBorrow}>Enregistrer</Button>
        </div>
    );
}

export default BorrowForm;
