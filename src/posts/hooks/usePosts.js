import { useNotification } from "../../providers/NotificationProvider";
import { useCallback, useState } from "react";
import {
    getAllPostsApi,
    getPostByIdApi,
    createPostApi,
    editPostApi,
    deletePostByIdApi,
    likePostByIdApi
} from "../services/postsApiService";
import { useAuth } from "../../providers/AuthProvider";

export default function usePosts() {
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const { token, user } = useAuth();
    const setNotification = useNotification();

    const getAllPosts = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getAllPostsApi();
            setNotification('green', 'All posts have been loaded successfully!');
            setPosts(data);
        } catch (e) {
            console.error(e);
            setNotification('red', 'Failed to load posts.');
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

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

    const createPost = useCallback(async (postData) => {
        try {
            const data = await createPostApi(postData);
            setNotification('green', 'Post created successfully!');
            setPosts(prevPosts => [...prevPosts, data]);
        } catch (e) {
            console.error(e);
            setNotification('red', 'Failed to create post.');
            setError(e.message);
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

    const likePostById = useCallback(
        async (id) => {
            setIsLoading(true);
            try {
                // ודא ש-user לא null לפני גישה ל-user._id
                if (!user) {
                    throw new Error("User is not authenticated");
                }

                const data = await likePostByIdApi(id, token);
                setPost(data);
                setPosts(prev => prev.map(post => {
                    if (post._id !== id) { return post; }
                    return data;
                }));

                // בדוק אם data.likes כולל את user._id
                if (data.likes.includes(user._id)) {
                    setNotification('green', `You liked the post: ${data.title}`);
                } else {
                    setNotification('green', `You unliked the post: ${data.title}`);
                }
            } catch (e) {
                console.error(e);
                setNotification('red', 'Failed to like post.');
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        },
        [user] // הוספת user לתלותות
    );




    return {
        posts,
        post,
        isLoading,
        error,
        getAllPosts,
        getPostById,
        createPost,
        editPost,
        likePostById,
        deletePostByIdApi,
    };
}
