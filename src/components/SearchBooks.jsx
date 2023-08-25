import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Axios from 'axios';
import consts from '../consts'
import BookTable from './BookComponents/BookTable'
import { useBooksContext } from '@/context/books';
import { useUserContext } from '@/context/user';
const CREATE_ROUTE = consts.CREATE_ROUTE
const util = require('util')


const styles = {
    main: {
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        height: "100%",
    },
    secondRow: {
        justifyContent: "space-evenly",
        display: "flex",
        flexFlow: "row"
    },
    header: {
        color: "#063A5B",
        fontSize: "3em",
        display: "flex",
        flexFlow: "row",
        justifyContent: "space-evenly",
        flex: "0 1 10%",
    },
    inputDiv: {
        color: "#063A5B",
        fontSize: "2em",
        flex: "0 1 60%",
    },
    buttonDiv: {
        flex: "0 1 20%",
        alignSelf: "center"
    },
    menuButton: {
        flex: "0 1 30%",
        fontWeight: 500,
        fontSize: "1em",
        color: "#FFFFFF",
        backgroundColor: "#063A5B",
        width: "60%"
    },
    input: {
        width: "100%",
        fontSize: "1em",
    },
    icon: {
        fontSize: "2.5em",
        alignSelf: "center",
    }

}
function SearchBook() {

    const [searchString, setSearchString] = useState("")


    const [user, setUser] = useUserContext()
    let isAdmin = false
    if (user.admin) {
        isAdmin = true
    } else { isAdmin = false }

    const [books, setBooks] = useBooksContext()

    const handleChange = e => {

        setSearchString(e.target.value)
    }

    const searchBooks = async () => {
        if (searchString) {
            try {
                const response = await Axios.get(CREATE_ROUTE(`livre/recherche?search_string=${searchString}`))
                console.log(response)
                if (response.status === 200) { // Check for a successful status code
                    console.log('Books fetched successfully!');
                    console.log(response)
                    const books = response.data.books; // Assuming response.data.rows contains the books array
                    setBooks(books); // Update the books context with fetched data
                    console.log(books)
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
                setBooks(books); // Update the books context with fetched data
                console.log(books)
            } else {
                console.error('Error fetching books');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getBooks(); // Fetch when component mounts
    }, [])

    return (
        <div style={styles.main}>
            <div style={styles.header} >
                Trouvez un livre
            </div>
            {isAdmin ?
                <div>
                    <RouterLink to="/addBooks" style={{ textDecoration: "none" }}>
                        <Button
                            style={styles.menuButton}>Ajouter un livre</Button>
                    </RouterLink>
                </div> : <div></div>}
            <div style={styles.secondRow}>
                <SearchIcon style={styles.icon} onClick={searchBooks} />
                <div style={styles.inputDiv}>
                    <Input id="input"
                        onChange={handleChange}
                        style={styles.input} type="search"
                        placeholder="Essayez 'la petite boutique aux poisons'"
                        value={searchString}
                    />
                </div>
            </div>
            <BookTable getBooks={getBooks} />
        </div>
    )
}



export default SearchBook;