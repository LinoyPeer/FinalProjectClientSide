import { useState, useCallback, useEffect } from "react";
import { Modal } from 'antd'; // יבוא את רכיב המודל מ-antd
import usePosts from "./usePosts";
import { useAuth } from "../../providers/AuthProvider";
import { commentPostByIdApi, likePostByIdApi } from "../services/postsApiService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routes";

export default function usePostsActions() {
    const { posts, setPosts, setIsLoading, isLoading, error, setError, getAllPosts } = usePosts();
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

    // const favoriteLikes = async (postId) => {
    //     const response = await likePostByIdApi(postId, token);
    //     console.log(response);
    //     const allThePostsUserLikedArray = response.likes
    //     return allThePostsUserLikedArray;
    // }

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

            // עדכון ה-userId של הפוסט עם ה-userId של המשתמש המחובר
            if (user && user._id) {
                postToUpdate.userId = user._id;  // עדכון ה-userId בפוסט
                console.log('Updated userId in post:', postToUpdate.userId);
            } else {
                console.error('User ID is missing');
                return;
            }

            // הוספת התגובה החדשה לפוסט
            postToUpdate.comments = [...(postToUpdate.comments || []), newComment];

            // שליחה ל-API כדי לעדכן את הפוסט עם התגובה החדשה
            const updatedPost = await commentPostByIdApi(postId, newComment, token);

            // עדכון המצב של הפוסטים עם הפוסט המעודכן
            setPosts(prevPosts => {
                // בדיקה אם הפוסט כבר נמצא בסטייט, אחרת הוסף אותו
                return prevPosts.map(post => post._id === postId ? updatedPost : post);
            });

            // עדכון התגובה בהצלחה
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
        updatePostComments,
    };
}

