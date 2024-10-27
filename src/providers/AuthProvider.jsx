import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/routes';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const login = () => {
        setIsLoggedIn(true);
        navigate(ROUTES.POSTS);
    }
    const logout = () => {
        setIsLoggedIn(false);
        navigate(ROUTES.ROOT);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useNotification must be used within NotificationProvider');
    return context;
};