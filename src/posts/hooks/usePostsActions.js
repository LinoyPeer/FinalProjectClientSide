import { useCallback, useEffect, useState } from "react";
import usePosts from "./usePosts";

export default function usePostsAction() {
    const { likePostById, posts } = usePosts();
    const [isLiked, setIsLiked] = useState(() => {
        const savedLikes = JSON.parse(localStorage.getItem("likedPosts") || "{}");
        return savedLikes;
    });

    const toggleLikeIcon = useCallback((postId) => {
        setIsLiked((prev) => {
            const updatedLikes = { ...prev, [postId]: !prev[postId] };
            localStorage.setItem("likedPosts", JSON.stringify(updatedLikes));
            return updatedLikes;
        });
    }, []);

    const handleLike = useCallback(
        (postId) => {
            toggleLikeIcon(postId);
            likePostById(postId);
        },
        [likePostById, toggleLikeIcon]
    );

    const getFavoritePosts = useCallback(() => {
        return posts.filter((post) => isLiked[post._id]);
    }, [posts, isLiked]);

    const handleComment = (id) => {
        console.log(id + " Commented");
    };

    const handleShare = (id) => {
        console.log(id + " Shared");
    };

    const handleSave = (id) => {
        console.log(id + " Saved");
    };

    return { handleLike, handleComment, handleShare, handleSave, getFavoritePosts, isLiked };
}

