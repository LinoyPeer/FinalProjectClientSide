import axios from "axios";
import { useNotification } from "../../providers/NotificationProvider";
import { useCallback, useState } from "react";

export default function usePosts() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const setNotification = useNotification();
    const apiUrl = "http://localhost:8181/posts";


    const getAllPosts = useCallback(async () => {
        try {
            const response = await axios.get(`${apiUrl}`);
            if (response.data) {
                console.log(response.data);
                setNotification('green', 'All posts have been loaded successfully!');
                setPosts(response.data);
            }
        } catch (e) {
            console.error(e);
            setNotification('red', 'Failed to load posts.');
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getPostById = useCallback(async (id) => {
        try {
            const response = await axios.get(`${apiUrl}`);
            if (response.data) {
                console.log(response.data);
                setNotification('green', 'All posts have been loaded successfully!');
                setPosts(response.data);
            }
        } catch (e) {
            console.error(e);
            setNotification('red', 'Failed to load posts.');
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }, []);


    return { posts, isLoading, error, getAllPosts, getPostById }
}