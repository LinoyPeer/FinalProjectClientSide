import axios from "axios";

const apiUrl = "https://finalprojectserverside-6qz1.onrender.com/posts";

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

export const createPostApi = async (data, token) => {
    console.log(data);
    try {
        const headers = {
            'x-auth-token': `${token}`,
            'Content-Type': 'multipart/form-data',
        };
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${apiUrl}`,
            headers: headers,
            data: data,
        };
        const response = await axios.request(config);
        console.log("Server response:", JSON.stringify(response.data));
        return response.data;
    } catch (e) {
        console.error("Error while creating post:", e.message);
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

export const commentPostByIdApi = async (id, data, token) => {
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${apiUrl}/${id}/comments`,
            headers: {
                'x-auth-token': `${token}`,
                'Content-Type': 'application/json',
            },
            data: data
        };

        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error('Error commenting:', error);
        throw error;
    }
};


export const deletePostByIdApi = async (id, token) => {
    try {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${apiUrl}/${id}`,
            headers: {
                'x-auth-token': `${token}`
            }
        };
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (e) {
        throw new Error(e.message);
    }
};
