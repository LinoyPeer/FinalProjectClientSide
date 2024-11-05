import { jwtDecode } from "jwt-decode";

const TOKEN = 'authToken'

export const removeTokenFromLocalStorage = () =>
    localStorage.removeItem(TOKEN);

export const setTokenInLocalStorage = (token) => {
    localStorage.setItem(TOKEN, token);
};

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem(TOKEN);
};

export const getUserDatailsFromLocalStorage = () => {
    try {
        const loginToken = getTokenFromLocalStorage()
        return jwtDecode(loginToken);
    } catch (e) {
        return null
    };
};