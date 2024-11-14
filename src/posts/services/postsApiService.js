import axios from "axios";

const apiUrl = "http://localhost:8181/posts";

export const getAllPostsApi = async () => {
    try {
        const { data } = await axios.get(apiUrl);
        return data;
    } catch (e) {
        throw new Error(e.message);
    }
};

export const getMyPostsApi = async (token) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${apiUrl}/my-posts`,
            headers: {
                'x-auth-token': `${token}`
            }
        };
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error('Error in getMyPostsApi:', error);
        throw new Error(error.message);
    }
};


export const getPostByIdApi = async (id) => {
    try {
        const { data } = await axios.get(`${apiUrl}/${id}`);
        return data;
    } catch (e) {
        throw new Error(e.message);
    }
};

export const createPostApi = async (postData) => {
    try {
        const { data } = await axios.post(apiUrl, postData);
        return data;
    } catch (e) {
        throw new Error(e.message);
    }
};

export const editPostApi = async (id, postData) => {
    try {
        const { data } = await axios.put(`${apiUrl}/${id}`, postData);
        return data;
    } catch (e) {
        throw new Error(e.message);
    }
};

export const likePostByIdApi = async (id, token) => {
    try {
        let config = {
            method: 'patch',
            url: `${apiUrl}/${id}`,
            headers: {
                'x-auth-token': `${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                liked: true,
            }
        };
        const response = await axios.request(config);
        return response.data;
    } catch (err) {
        throw new Error(err.message);
    }
};


export const deletePostByIdApi = async (id) => {
    try {
        const { data } = await axios.delete(`${apiUrl}/${id}`);
        return data;
    } catch (e) {
        throw new Error(e.message);
    }
};