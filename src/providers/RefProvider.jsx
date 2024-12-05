import React, { createContext, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/routes';

const RefContext = createContext();

export default function RefProvider({ children }) {
    const divRef = useRef();
    const navigate = useNavigate();

    const handlePostClick = () => {
        navigate(ROUTES.POSTS);
        divRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <RefContext.Provider value={{ divRef, handlePostClick }}>
            {children}
        </RefContext.Provider>
    );
}

export const useReference = () => {
    const context = useContext(RefContext);
    if (!context) throw new Error('useReference must be used within a Provider');
    return context;
};
