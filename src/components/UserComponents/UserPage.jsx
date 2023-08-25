import React, { useEffect } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import { Button } from '@mui/material'
import { Link as RouterLink } from "react-router-dom";
import { useUtilisateursContext } from "@/context/utilisateurs";
import Axios from 'axios'
import consts from "@/consts";
import { CREATE_ROUTE } from "@/consts";


function UserPage() {

    const [utilisateurs, setUtilisateurs] = useUtilisateursContext()


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

    useEffect(() => {

        console.log('in effect');
        getUsers(); // Fetch when component mounts
    }, [])

    return (
        <div>

            <RouterLink to="/addUser" style={{ textDecoration: "none" }}>
                <Button>Ajouter un utilisateur</Button>
            </RouterLink>

            <UserTable />
        </div>
    )


}

export default UserPage