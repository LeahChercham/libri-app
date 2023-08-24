
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink } from "react-router-dom";
import { useUserContext } from '@/context/user';


const styles = {
    appbar: { backgroundColor: "#0F202A", height: 100 },
    menuButton: {
        fontWeight: 500,
        size: "18px",
        color: "#FFFFFF",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 100
    },
    links: {
        display: "flex",
    },
    linksBox: {
        display: 'flex',
        width: "100%",
        alignItems: "center",
        justifyContent: "space-evenly"
    }
}

function NavBar() {

    const [user, setUser] = useUserContext()
    let isAdmin = false
    if (user.admin) {
        isAdmin = true
    } else { isAdmin = false }

    const logout = e => {

        event.preventDefault();
        setUser(
            {
                user: "",
                admin: false,
                sessionStart: null
            }
        )

    }

    return (
        <AppBar style={styles.appbar}>
            <Toolbar style={styles.toolbar}>


                <div><RouterLink to="/" style={{ textDecoration: "none" }}>
                    <Button style={styles.menuButton}>LIBRI</Button>
                </RouterLink></div>
                <div>   <RouterLink to="/search" style={{ textDecoration: "none" }}>
                    <Button style={styles.menuButton}>RECHERCHE</Button>
                </RouterLink>
                </div>
                <div>{isAdmin ? <RouterLink to="/" style={{ textDecoration: "none" }}>
                    <Button style={styles.menuButton} onClick={logout}>DECONNEXION</Button>
                </RouterLink> : <RouterLink to="/login" style={{ textDecoration: "none" }}>
                    <Button style={styles.menuButton}>CONNEXION</Button>
                </RouterLink>}

                </div>
                <div>{isAdmin ? <RouterLink to="/users" style={{ textDecoration: "none" }}>
                    <Button style={styles.menuButton}>UTILISATEURS</Button>
                </RouterLink> : null}
                </div>
                <div>{isAdmin ? <RouterLink to="/borrows" style={{ textDecoration: "none" }}>
                    <Button style={styles.menuButton}>EMPRUNTS</Button>
                </RouterLink> : null}
                </div>


            </Toolbar>

        </AppBar>
    )

}

export default NavBar;