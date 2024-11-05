import axios from "axios"

const apiUrl = `http://localhost:8181/users`

export const loginUserApi = async (userLogin) => {
    try {
        const { data } = await axios.post(`${apiUrl}/login`, userLogin);
        return data;
    } catch (e) {
        throw new Error(e.message);
    }
};

export const signupUserApi = async (nomrmlizedUser) => {
    try {
        const { data } = axios.post(apiUrl, nomrmlizedUser);
        return data;
    } catch (e) {
        throw new Error(e.message);
    }
};