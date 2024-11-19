// import { jwtDecode } from "jwt-decode";

// const TOKEN = 'authToken'

// export const removeTokenFromLocalStorage = () =>
//     localStorage.removeItem(TOKEN);

// export const setTokenInLocalStorage = (token) => {
//     localStorage.setItem(TOKEN, token);
// };

// export const getTokenFromLocalStorage = () => {
//     return localStorage.getItem(TOKEN);
// };

// export const getuserDetailsFromLocalStorage = () => {
//     try {
//         const loginToken = getTokenFromLocalStorage()
//         return jwtDecode(loginToken);
//     } catch (e) {
//         return null
//     };
// };


import { jwtDecode } from "jwt-decode";

const TOKEN = 'authToken';
const LIKED_POSTS_KEY = 'likedPosts';

export const removeTokenFromLocalStorage = () =>
    localStorage.removeItem(TOKEN);

export const setTokenInLocalStorage = (token) => {
    localStorage.setItem(TOKEN, token);
};

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem(TOKEN);
};

export const getuserDetailsFromLocalStorage = () => {
    try {
        const loginToken = getTokenFromLocalStorage();
        return jwtDecode(loginToken);
    } catch (e) {
        return null;
    }
};

export const getLikedPostsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(LIKED_POSTS_KEY) || "{}");
};

export const setLikedPostsInLocalStorage = (likedPosts) => {
    localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(likedPosts));
};
