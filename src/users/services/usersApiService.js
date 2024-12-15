import axios from "axios";

const apiUrl = `http://localhost:8181/users`;

export const loginUserApi = async (data, token) => {
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${apiUrl}/login`,
            headers: {
                'x-auth-token': `${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        return response.data;
    } catch (e) {
        console.log(e);
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

        let errorMessage = 'An error occurred during signup.';

        if (e.response) {
            if (e.response.status === 400) {
                errorMessage = 'Email or Number is already exits.';
            } else if (e.response.status === 500) {
                errorMessage = 'Server Error: Please try again later.';
            } else {
                errorMessage = `Unexpected error: ${e.response.status}`;
            }
        } else {
            errorMessage = `Error: ${e.message}`;
        }
        throw new Error(errorMessage);
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
export const editUserApi = async (userId, token, data) => {
    try {
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${apiUrl}/${userId}`,
            headers: {
                'x-auth-token': token,
            },
            data: data
        };
        console.log(config.url);
        const response = await axios.request(config); // כאן אנחנו מחכים לתשובה
        console.log("Response data:", JSON.stringify(response.data));
        return response.data; // מחזירים את התוצאה
    } catch (e) {
        console.error('Error fetching all users:', e);
        throw new Error(e.message);
    }
};
