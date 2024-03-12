import { useNavigate } from 'react-router-dom'
import { createContext, useContext, useEffect, useState } from 'react'

import { getCurrentUser } from '../lib/appwrite/api'

export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '', 
    bio: '',  
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsLoading: () => {},
    checkAuthUser: async () => false,
}

const AuthContext = createContext(INITIAL_STATE)

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(INITIAL_USER) // the user object
    const [isAuthenticated, setIsAuthenticated] = useState(false) // authentication state
    const [isLoading, setisLoading] = useState(false) // loading state

    // check if we have a logged in user, whenever the page is refreshed
    const checkAuthUser = async () => {
        setisLoading(true);
        try {
            const currentAccount = await getCurrentUser();
            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                })
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error(error)
            return false;
        } finally {
            setisLoading(false)
        }
    };

    // check if we have a logged in user, whenever the page is refreshed
    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (
            cookieFallback === "[]" ||
            cookieFallback === null ||
            cookieFallback === undefined
        ) {
          navigate("/sign-in");
        }
        // check if we have a logged in user
        checkAuthUser();
    }, [])

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext);
