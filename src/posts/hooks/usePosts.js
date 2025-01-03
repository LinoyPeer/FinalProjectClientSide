import { useNotification } from "../../providers/NotificationProvider";
import { useCallback, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import {
    createPostApi,
    getAllPostsApi,
    getPostByIdApi,
    editPostApi,
    deletePostByIdApi,
    getMyPostsApi,
} from "../services/postsApiService";

export default function usePosts() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const { token } = useAuth();
    const setNotification = useNotification();

    const getAllPosts = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getAllPostsApi();
            setPosts(data);
        } catch (e) {
            setError(e.message);
            console.error('Error loading posts:', e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getMyPosts = useCallback(async () => {
        setIsLoading(true);
        try {
            const myPostsData = await getMyPostsApi(token);
            if (myPostsData) {
                setPosts(myPostsData);
                console.log('Updated posts:', myPostsData);
            }
        } catch (error) {
            console.error(error);
            setNotification("red", "Failed to load cards.");
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [setNotification, token]);


    const getPostById = useCallback(async (id) => {
        setIsLoading(true);
        try {
            const data = await getPostByIdApi(id);
            setNotification('green', 'Post loaded successfully!');
            setPosts([data]);
        } catch (e) {
            console.error(e);
            setNotification('red', 'Failed to load post.');
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createPost = useCallback(async (postData, token) => {
        try {
            let formData = new FormData();
            console.log(formData);
            for (const [key, value] of Object.entries(postData)) {
                formData.append(key, value);
            }
            const response = await createPostApi(formData, token);
            console.log('Server response:', response);
            setPosts((prevPosts) => [...prevPosts, response]);
            return response;
        } catch (err) {
            console.error('Failed to create post:', err.message);
            setError(err.message);
        }
    }, []);

    const editPost = useCallback(async (id, postData) => {
        try {
            const data = await editPostApi(id, postData);
            setNotification('green', 'Post updated successfully!');
            setPosts(prevPosts => prevPosts.map(post => post._id === id ? data : post));
        } catch (e) {
            console.error(e);
            setNotification('red', 'Failed to update post.');
            setError(e.message);
        }
    }, []);

    const deletePostById = useCallback(async (id) => {
        try {
            console.log('id: ', id);
            console.log('token: ', token);
            const data = await deletePostByIdApi(id, token);
            setNotification('green', 'Post updated successfully!');
            setPosts(prevPosts => prevPosts.map(post => post._id === id ? data : post));
        } catch (e) {
            console.error(e);
            setNotification('red', 'Failed to update post.');
            setError(e.message);
        }
    }, []);

    return {
        posts,
        setPosts,
        isLoading,
        setIsLoading,
        error,
        setError,
        getAllPosts,
        getPostById,
        createPost,
        editPost,
        deletePostById,
        getMyPosts,
        deletePostById,
    };
}
