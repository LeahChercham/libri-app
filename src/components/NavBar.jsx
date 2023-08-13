
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

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


    return (
        <AppBar style={styles.appbar}>
            <Toolbar style={styles.toolbar}>
                <div>LIBRI</div>
                <div>New search</div>
                <div>log in</div>
            </Toolbar>

        </AppBar>
    )

}

export default NavBar;