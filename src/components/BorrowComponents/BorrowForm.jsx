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
import { useUtilisateursContext } from '@/context/utilisateurs';
import { useStatutContext } from '@/context/statut';
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
    let date = new Date()
    let today = (date.toISOString().substring(0, 10))
    let calcDate = new Date()
    calcDate.setDate(date.getDate() + 30)
    let today_plus_30 = calcDate.toISOString().substring(0, 10)
    const [borrowData, setBorrowData] = useState({ // TODO 
        dateemprunt: today,
        dateretourprevu: today_plus_30,
        dateretourreel: '',
        utilisateur_uid: '',
        statut_sid: '',
        livres: []
    });



    const [showTooLongText, setShowTooLongText] = useState({ show: false, text: "" })
    const [searchString, setSearchString] = useState("")
    const [books, setBooks] = useBooksContext()
    const [options, setOptions] = useState([])
    const [userOptions, setUserOptions] = useState([])

    const [utilisateur, setUtilisateurs] = useUtilisateursContext()

    const [statut, setStatut] = useStatutContext()

    const statutOptions = statut.map(s => ({ value: s.SID, label: s.APPELLATION }))

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBorrowData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        console.log("value: " + value)
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


    const searchUser = async (inputValue) => {
        console.log('searching user ' + inputValue);
        if (inputValue) {
            try {
                const response = await Axios.get(CREATE_ROUTE(`utilisateurs/recherche?search_string=${inputValue}`))
                console.log(response)
                if (response.status === 200) { // Check for a successful status code
                    console.log('Utilisateurs fetched successfully!');
                    console.log(response)
                    const users = response.data.users; // Assuming response.data.rows contains the users array
                    //  setUtilisateurs(users); // Update the users context with fetched data
                    let newOptions = users.map((u) => ({ value: u.UTID, label: `${u.PRENOM} ${u.NOM} - ${u.EMAIL} - ${u.TELEPHONE}` }))
                    setUserOptions(newOptions)
                    console.log(userOptions)
                    return userOptions
                } else {
                    console.error('Error fetching books');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            getUsers() // TO DO 
        }
    }

    const getUsers = async () => {

        console.log("getting users");
        try {
            const response = await Axios.get(CREATE_ROUTE('utilisateurs'));
            console.log(response)
            if (response.status === 200) { // Check for a successful status code
                console.log('users fetched successfully!');
                console.log(response)
                const users = response.data.users; // Assuming response.data.rows contains the books array
                setUtilisateurs(users); // Update the users context with fetched data
                console.log(users)
            } else {
                console.error('Error fetching users');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const searchBook = async (inputValue) => {

        console.log("searching book " + inputValue)
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
                type="date"
                name="dateemprunt"
                placeholder="Date de l'emprunt"
                value={borrowData.dateemprunt}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck}
                style={style.input}
            />
            <input
                type="date"
                name="dateretourprevu"
                // automatically filled (+30 days)
                placeholder="Date de retour prévu"
                value={borrowData.dateretourprevu}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck} style={style.input}
            />

            <input
                type="date"
                name="dateretourreel"
                // automatically filled (+30 days)
                placeholder="Date de retour réel"
                value={borrowData.dateretourreel}
                onChange={handleInputChange}
                maxLength="240" onInput={maxLengthCheck} style={style.input}
            />

            <AsyncSelect
                name="users"
                multi={false}
                loadOptions={searchUser}
                closeMenuOnSelect={false}
                closeMenuOnScroll={false}
                style={style.input}
            />
            <div style={style.input}>
                <AsyncSelect
                    name="books"
                    isMulti
                    loadOptions={searchBook}
                    closeMenuOnSelect={false}
                    closeMenuOnScroll={false}
                    style={style.input}
                />
            </div>
            <div style={style.input}>
                <Select
                    name="statut"
                    multi={false}
                    options={statutOptions}

                // default value ? 
                />
            </div>


            {showTooLongText.show ? <div style={style.tooLongText}>{showTooLongText.text}</div> : <div></div>}


            <Button onClick={handleSaveBorrow}>Enregistrer</Button>
        </div >
    );
}

export default BorrowForm;
