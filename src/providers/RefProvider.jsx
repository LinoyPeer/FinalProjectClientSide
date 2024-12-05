import React, { createContext, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/routes';

const RefContext = createContext();

export default function RefProvider({ children }) {
    const postRefs = useRef({});
    const navigate = useNavigate();

    const handlePostClick = (postId) => {
        navigate(`${ROUTES.POSTS}?postId=${postId}`);

        setTimeout(() => {
            if (postRefs.current[postId]) {
                postRefs.current[postId].scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    };

    const setPostRef = (postId, ref) => {
        postRefs.current[postId] = ref;
    };

    return (
        <RefContext.Provider value={{ postRefs, handlePostClick, setPostRef }}>
            {children}
        </RefContext.Provider>
    );
}

export const useReference = () => {
    const context = useContext(RefContext);
    if (!context) throw new Error('useReference must be used within a Provider');
    return context;
};
