import React, { useEffect } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import { Button } from '@mui/material'
import { Link as RouterLink } from "react-router-dom";
import { useBorrowsContext } from "@/context/borrows";
import Axios from 'axios'
import consts from "@/consts";
import { CREATE_ROUTE } from "@/consts";


function Borrows() {

    const [borrows, setBorrows] = useBorrowsContext()


    const getBorrows = async () => {

        console.log("getting borrows");
        try {
            const response = await Axios.get(CREATE_ROUTE('borrows'));
            console.log(response)
            if (response.status === 200) { // Check for a successful status code
                console.log('borrows fetched successfully!');
                console.log(response)
                const borrows = response.data.borrows; // Assuming response.data.rows contains the books array
                setBorrows(borrows); // Update the borrows context with fetched data
                console.log(borrows)
            } else {
                console.error('Error fetching borrows');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {

        console.log('in effect');
        getBorrows(); // Fetch when component mounts
    }, [])

    return (
        <div>

            <RouterLink to="/addBorrows" style={{ textDecoration: "none" }}>
                <Button>Ajouter un emprunt</Button>
            </RouterLink>

            <UserTable />
        </div>
    )


}

export default Borrows