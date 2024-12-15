import { useState, useCallback } from "react";
import { Modal } from 'antd'; // יבוא את רכיב המודל מ-antd
import usePosts from "./usePosts";
import { useAuth } from "../../providers/AuthProvider";
import { commentPostByIdApi, likePostByIdApi } from "../services/postsApiService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routes";

export default function usePostsActions() {
    const { setPosts, setIsLoading, isLoading, error, setError } = usePosts();
    const { user, token } = useAuth();
    const [favoritePosts, setFavoritePosts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleShare = useCallback(() => {
        setIsModalVisible(true);
    }, []);

    const handleMenu = useCallback(() => {
        setIsModalVisible(true);
    }, []);


    const hanndleChooseOption = (route) => {
        navigate(route);
        setIsModalVisible(false)
    }

    const handleCancelModal = () => {
        setIsModalVisible(false);
    };

    const handleLike = useCallback(async (postId) => {
        setPosts((prevPosts) => {
            const updatedPosts = prevPosts.map(post =>
                post._id === postId ? { ...post, likes: [...post.likes, user._id] } : post
            );
            return updatedPosts;
        });

        setFavoritePosts((prevFavorites) => {
            const updatedFavorites = prevFavorites.map(post =>
                post._id === postId ? { ...post, likes: [...post.likes, user._id] } : post
            );
            return updatedFavorites;
        });
        try {
            const updatedPost = await likePostByIdApi(postId, token);
            console.log('Updated post:', updatedPost);
            setPosts((prevPosts) =>
                prevPosts.map(post => post._id === postId ? updatedPost : post)
            );
            setFavoritePosts((prevFavorites) => {
                if (updatedPost.likes.includes(user._id)) {
                    return [...prevFavorites.filter(post => post._id !== postId), updatedPost];
                } else {
                    return prevFavorites.filter(post => post._id !== postId);
                }
            });
        } catch (error) {
            setError(error.message);
            console.error('Error toggling like:', error);
        } finally {
            setIsLoading(false);
        }
    }, [user, token, setPosts, setError]);

    const handleComment = useCallback(async (postId, commentData, token) => {
        setIsLoading(true);
        navigate(`${ROUTES.POST_COMMENTS.replace(':postId', postId)}`, { state: { user } });
        try {
            const data = await commentPostByIdApi(postId, commentData, token);
            console.log('Comment created successfully:', data);
            return data;
        } catch (e) {
            setError(e.message);
            console.error('Error commenting:', e.message);
        } finally {
            setIsLoading(false);
        }
    }, []);



    return {
        handleLike,
        favoritePosts,
        handleComment,
        handleShare,
        setIsLoading,
        setError,
        isLoading,
        error,
        setPosts,
        isModalVisible,
        handleCancelModal,
        handleMenu,
        hanndleChooseOption,
    };
}

