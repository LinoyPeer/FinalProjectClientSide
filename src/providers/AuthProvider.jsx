// import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ROUTES from '../routes/routes';
// import { getTokenFromLocalStorage, getuserDetailsFromLocalStorage } from '../users/services/localStorageService';
// import axios from 'axios';

// const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [userDetails, setUserDetails] = useState(null);
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(getTokenFromLocalStorage());

//     const navigate = useNavigate();

//     useEffect(() => {
//         if (user && token) {
//             let config = {
//                 method: 'get',
//                 maxBodyLength: Infinity,
//                 url: `http://localhost:8181/users/${user._id}`,
//                 headers: {
//                     'x-auth-token': `${token}`
//                 }
//             };

//             axios.request(config)
//                 .then((response) => {
//                     console.log(JSON.stringify(response.data));
//                     setUserDetails(response.data);
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         }
//     }, [user, token]);


//     useEffect(() => {
//         if (user === null) {
//             const userFromLocalStorage = getuserDetailsFromLocalStorage();
//             setUser(userFromLocalStorage);
//         }
//     }, [user]);

//     useEffect(() => {
//         if (!isLoggedIn && token) {
//             setIsLoggedIn(true);
//         }
//     }, [isLoggedIn, token]);

//     const login = (newToken) => {
//         setToken(newToken);
//         setIsLoggedIn(true);
//         navigate(ROUTES.POSTS);
//     };
//     const logout = () => {
//         setIsLoggedIn(false);
//         setToken(null);
//         navigate(ROUTES.ROOT);
//     };

//     return (
//         <AuthContext.Provider value={{ isLoggedIn, token, user, setToken, login, logout, userDetails }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) throw new Error('useAuth must be used within AuthProvider');
//     return context;
// };

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/routes';
import { getTokenFromLocalStorage, getuserDetailsFromLocalStorage, removeTokenFromLocalStorage } from '../users/services/localStorageService';
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
            const config = {
                method: 'get',
                url: `http://localhost:8181/users/${user._id}`,
                headers: {
                    'x-auth-token': `${token}`
                }
            };

            axios(config)
                .then(response => {
                    console.log('Response:', response);
                    setUserDetails(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user details:', error);
                });
        } else {
            console.log('User or token is missing');
        }
    }, [user, token]);



    // בדיקה אם המשתמש נמצא ב־localStorage ומעדכן את ה־user
    useEffect(() => {
        if (user === null) {
            const userFromLocalStorage = getuserDetailsFromLocalStorage();
            setUser(userFromLocalStorage);
        }
    }, [user]);  // עושה עדכון רק כשיש צורך

    // בדיקה אם המשתמש מחובר
    useEffect(() => {
        if (!isLoggedIn && token) {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn, token]);  // עושה עדכון רק כשיש צורך

    const login = (newToken) => {
        setToken(newToken);
        setIsLoggedIn(true);
        navigate(ROUTES.POSTS);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserDetails(null); // מאפס את פרטי המשתמש
        setToken(null); // מאפס את ה-token
        removeTokenFromLocalStorage(); // מסיר את ה-token מה-localStorage
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

