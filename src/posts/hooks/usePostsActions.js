import { useState, useCallback, useEffect } from "react";
import usePosts from "./usePosts";
import { useAuth } from "../../providers/AuthProvider";
import { commentPostByIdApi, likePostByIdApi } from "../services/postsApiService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routes";

export default function usePostsActions() {
    const { posts, setPosts, setIsLoading, isLoading, error, setError, getAllPosts, deletePostById } = usePosts();
    const { user, token } = useAuth();
    const [favoritePosts, setFavoritePosts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();


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
        try {
            navigate(`${ROUTES.POST_COMMENTS.replace(':postId', postId)}`, { state: { user } });
        } catch (e) {
            setError(e.message);
            console.error('Error commenting:', e.message);
        }
    }, []);

    useEffect(() => {
        const postsData = getAllPosts();
        setPosts(postsData);
    }, [])
    const updatePostComments = useCallback(async (postId, newComment) => {
        if (posts.length === 0) {
            console.error('No posts available');
            return;
        }

        console.log('postId: ', postId);
        console.log('newComment: ', newComment);

        if (token) {
            console.log('token: ', token);
        }

        try {
            console.log('Current posts:', posts);
            const postToUpdate = posts.find(post => post._id === postId);
            console.log('Found post:', postToUpdate);

            if (!postToUpdate) {
                console.error('Post not found');
                return;
            }

            if (user && user._id) {
                postToUpdate.userId = user._id;
                console.log('Updated userId in post:', postToUpdate.userId);
            } else {
                console.error('User ID is missing');
                return;
            }
            postToUpdate.comments = [...(postToUpdate.comments || []), newComment];
            const updatedPost = await commentPostByIdApi(postId, newComment, token);
            setPosts(prevPosts => {
                return prevPosts.map(post => post._id === postId ? updatedPost : post);
            });
            console.log('Comment added successfully:', updatedPost);
        } catch (e) {
            setError(e.message);
            console.error('Error updating comments:', e.message);
        } finally {
            setIsLoading(false);
        }
    }, [setPosts, setError, setIsLoading, posts, user, token]);


    return {
        handleLike,
        favoritePosts,
        handleComment,
        setIsLoading,
        setError,
        isLoading,
        error,
        setPosts,
        isModalVisible,
        handleCancelModal,
        handleMenu,
        hanndleChooseOption,
        updatePostComments,
        deletePostById,
    };
}

