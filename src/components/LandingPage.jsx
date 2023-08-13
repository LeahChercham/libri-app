import React, { Component } from 'react';
import { Link as RouterLink } from "react-router-dom";
import Button from '@mui/material/Button';
import landingImage from './landingImage.jpg'

const styles = {
    main: {
        display: "flex",
        flexFlow: "row",
        justifyContent: "center",
        height: "100%",
    },
    secondColumn: {
        justifyContent: "center",
        display: "flex",
        flexFlow: "column"
    },
    text: {
        header: {
            color: "#0F202A",
            fontSize: "4em",
            flex: "0 1 20%",
        },
        body: {
            color: "#0F202A",
            fontSize: "2em",
            flex: "0 1 20%",
        }
    },
    menuButton: {
        fontWeight: 500,
        fontSize: "1em",
        color: "#FFFFFF",
        backgroundColor: "#063A5B",
    },
    image: {
        flex: "0 1 40%",
    }

}
class LandingPage extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div style={styles.main}>
                <div style={styles.image} >
                    {/* <img src={landingImage} style={{ maxHeight: "99%" }} alt="racket" /> */}
                </div>
                <div style={styles.secondColumn}>

                    <div style={styles.text.header}>
                        LIBRI
                    </div>
                    <div style={styles.text.body}>
                        Vérifier la disponibilité de vos titres préférés à votre bibliothèque locale.
                    </div>
                    <div>
                        <RouterLink to="/search" style={{ textDecoration: "none" }}>
                              <Button style={styles.menuButton}>Démarrer une nouvelle recherche</Button>
                    </RouterLink>


                </div>
            </div>
            </div >
        )
    }

}

export default LandingPage;