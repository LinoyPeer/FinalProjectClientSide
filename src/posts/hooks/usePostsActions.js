import { useCallback, useState } from "react";
import usePosts from "./usePosts";
import { useAuth } from "../../providers/AuthProvider";
import { likePostByIdApi } from "../services/postsApiService";

export default function usePostsActions() {
    const { setPosts, setIsLoading, isLoading, error, setError } = usePosts();
    const { user, token } = useAuth();
    const [favoritePosts, setFavoritePosts] = useState([]);


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

    const handleComment = () => {
        console.log('Comment handled');
    };

    const handleShare = () => {
        console.log('Share handled');
    };



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
    };
}
