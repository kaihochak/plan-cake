import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser } from '../lib/appwrite/api'
import { useNavigate } from 'react-router-dom'

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
    const [user, setUser] = useState(INITIAL_USER)
    const [isLoading, setisLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const navigate = useNavigate();

    // check if we have a logged in user
    const checkAuthUser = async () => {
        try {
            const currentAccount = await getCurrentUser();

            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio,
                })
                return true;
            }

        } catch (error) {
            console.error(error)
            return false;
        } finally {
            setisLoading(false)
        }
    };

    useEffect(() => {
        // if the user is not logged in, redirect to the sign-in page
        if (
            localStorage.getItem('cookieFallback' === `[]` || 
            localStorage.getItem('cookieFallback' === null))
        ) navigate('/sign-in')

        // check if we have a logged in user
        checkAuthUser();
    }, [])

    const value = {
        user,
        setUser,
        isLoading,
        setisLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser: async () => {
            setisLoading(true)
            // check if we have a logged in user
            // if we do, set the user and isAuthenticated to true
            // if we don't, set the user and isAuthenticated to false
            setisLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext);
