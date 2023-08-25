import React from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import { Button } from '@mui/material'
import { Link as RouterLink } from "react-router-dom";


function UserPage() {
    console.log('in user page')

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