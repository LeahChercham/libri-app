import { createContext, useContext, useState } from "react";

const Context = createContext() // creates a new context object

export function UserProvider({children}){
    const [user, setUser] = useState({ // set initial value for the Context to no user
        user: "", 
        admin: false,
        sessionStart: null
    })
    return (
        <Context.Provider value = {[user, setUser]}>{children}</Context.Provider>
    )
}

export function useUserContext(){ // custom Hook that will allow access to the user state after imported into individaul pages or components of the app
    return useContext(Context)
}