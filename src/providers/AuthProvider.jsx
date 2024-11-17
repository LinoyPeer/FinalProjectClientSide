import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/routes';
import { getTokenFromLocalStorage, getUserDatailsFromLocalStorage } from '../users/services/localStorageService';
import axios from 'axios';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(getTokenFromLocalStorage());

    const navigate = useNavigate();

    useEffect(() => {
        if (user && token) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:8181/users/${user._id}`,
                headers: {
                    'x-auth-token': `${token}`
                }
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setUserDetails(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user, token]);


    useEffect(() => {
        if (user === null) {
            const userFromLocalStorage = getUserDatailsFromLocalStorage();
            setUser(userFromLocalStorage);
        }
    }, [user]);

    useEffect(() => {
        if (!isLoggedIn && token) {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn, token]);

    const login = (newToken) => {
        setToken(newToken);
        setIsLoggedIn(true);
        navigate(ROUTES.POSTS);
    };
    const logout = () => {
        setIsLoggedIn(false);
        setToken(null);
        navigate(ROUTES.ROOT);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, user, setToken, login, logout, userDetails }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
