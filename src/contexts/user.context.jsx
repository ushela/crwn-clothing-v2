
import {createContext, useState, useEffect } from 'react';

import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';


//as the actual value u want to access
export const UserContext = createContext({
    currentUser: null,
    // blank function
    setCurrentUser: () => null,
})


// actual component

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    //[]dependency array: only want to run this once wen the component mounts
    useEffect(() => {
        // onAuthStateChangedListener which runs a callback function wen auth state change 
        //centralizes all the code related to authentication in one listener
        //signout and signIn centralized into the listener callback function
        const unsubscribe = onAuthStateChangedListener((user) => {
            //if u get a user then create a user doc else set the current user 
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unsubscribe
    }, [])

   return <UserContext.Provider value={value}>{children}</UserContext.Provider> 
}