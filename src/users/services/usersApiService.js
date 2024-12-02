import axios from "axios";

const apiUrl = `http://localhost:8181/users`;

export const loginUserApi = async (userLogin) => {
    try {
        const { data } = await axios.post(`${apiUrl}/login`, userLogin);
        return data;
    } catch (e) {
        throw new Error(e.message);
    }
};

export const signupUserApi = async (normalizedUser) => {
    try {
        const { data } = await axios.post(apiUrl, normalizedUser);
        console.log('data: ', data);
        return data;
    } catch (e) {
        console.error('Error during signup:', e);

        if (e.response) {
            if (e.response.status === 400) {
                setNotification('red', 'Bad Request: Please check your input.');
            } else if (e.response.status === 500) {
                setNotification('red', 'Server Error: Please try again later.');
            } else {
                setNotification('red', `Unexpected error: ${e.response.status}`);
            }
        } else {
            setNotification('red', `Error: ${e.message}`);
        }
        throw new Error(e.message);
    }
};



export const getUserDetailsApi = async (userId, token) => {
    try {
        const config = {
            method: 'get',
            url: `${apiUrl}/${userId}`,
            headers: {
                'x-auth-token': token,
            },
        };
        const { data } = await axios.request(config);
        return data;
    } catch (e) {
        console.error('Error fetching user details:', e);
        throw new Error(e.message);
    }
};


export const getAllUsersApi = async (token) => {
    try {
        const config = {
            method: 'get',
            url: apiUrl,
            headers: {
                'x-auth-token': token,
            },
        };
        const { data } = await axios.request(config);
        return data;
    } catch (e) {
        console.error('Error fetching all users:', e);
        throw new Error(e.message);
    }
};
