import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import app from '../firebase/firebase.init';


export const AuthContext = createContext();
const auth=getAuth(app)
const UserContext = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading,setLoading]=useState(true)

    const googleProvider = new GoogleAuthProvider();
    
    const userEmail = (email,password) => {
       return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password);
    }

    const logOut = () => {
        return signOut(auth);
    }

    const googleSignIn = () => {
        return signInWithPopup(auth,googleProvider)
    }

    useEffect(() => {
     const unsubcribe=   onAuthStateChanged(auth, currentUser => {
         setUser(currentUser)
         setLoading(false)
         console.log("Auth state changed",currentUser)
     })
        return () => {
            unsubcribe()
        }
    },[])

    const authInfo = { user,loading, userEmail, signIn, logOut,googleSignIn };
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
            {children}
            </AuthContext.Provider>  
        </div>
    );
};

export default UserContext;