import React, { useEffect } from "react";
import { Button } from '@mui/material'
import { Link as RouterLink } from "react-router-dom";
import { useBorrowsContext } from "@/context/borrows";
import Axios from 'axios'
import consts from "@/consts";
import { CREATE_ROUTE } from "@/consts";
import BorrowTable from "./BorrowComponents/BorrowTable";


function Borrows() {

    const [borrows, setBorrows] = useBorrowsContext()


    const getBorrows = async () => {

        console.log("getting borrows");
        try {
            const response = await Axios.get(CREATE_ROUTE('borrowsdetails'));
            console.log(response)
            if (response.status === 200) { // Check for a successful status code
                console.log('borrows fetched successfully!');
                console.log(response)
                const data = response.data.borrows; // Assuming response.data.rows contains the borrows array
                setBorrows(data); // Update the borrows context with fetched data
                console.log(data)
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

            <BorrowTable />
        </div>
    )


}

export default Borrows