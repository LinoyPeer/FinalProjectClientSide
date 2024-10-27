import React, { createContext, useContext, useState } from 'react'

const userContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState({ first: '' });
    return (
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>

    )
}

export const useUser = () => {
    const context = useContext(userContext);
    if (!context) throw new Error('Your costume hook useUser must be used within provider')
    return context;
}



