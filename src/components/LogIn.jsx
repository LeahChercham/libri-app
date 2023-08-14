import React, {useEffect} from 'react'
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Button } from "@mui/material";
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/user';


const styles = {
    main: {
        display: "flex",
        flexFlow: "column",
        justifyContent: "space-evenly",
        alignContent: "center"
    },
    text: {
        header: {
            fontSize: "2em",
            marginTop: "0.5em",
            display: "flex",
            justifyContent: "center",
            color: "#0F202A"
        }
    }

}

function LogIn(props) {

    const navigate = useNavigate()
    const [user, setUser] = useUserContext()
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     login(state.username, state.password);
    // }

    const handleSubmit = event => {
        
        event.preventDefault();
        setUser(
            {
                user: "ADMIN",
                admin: true,
                sessionStart: Date.now()
            }
        )
    }

    useEffect(() => {
        if (user.user != "") {
            navigate("/search")
        }
    }
    )
    
    return (
        <div>
            <div style={{ marginLeft: "4em", marginRight: "4em" }}>
                <div style={styles.text.header}>Log In</div>
                <FormControl style={styles.main}>
                    <div>
                        <TextField
                            id="username"
                            label="Username"
                            // value={state.username}
                            // onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div>
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            // value={state.password}
                            // onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Log In
                        </Button>
                    </div>
                    <div>
                        {/* {state.problem} */}
                    </div>
                </FormControl>
            </div >
        </div>

    )
}

export default LogIn