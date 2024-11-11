import { useCallback, useState } from "react";
import { getLikedPostsFromLocalStorage, setLikedPostsInLocalStorage } from "../../users/services/localStorageService";
import usePosts from "./usePosts";

export default function usePostsAction() {
    const { likePostById, posts } = usePosts();
    const [favoritePosts, setFavoritePosts] = useState([]);
    const [isLiked, setIsLiked] = useState(() => getLikedPostsFromLocalStorage());

    const toggleLikeIcon = useCallback((postId) => {
        setIsLiked((prev) => {
            const updatedLikes = { ...prev, [postId]: !prev[postId] };
            setLikedPostsInLocalStorage(updatedLikes);
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
        console.log('posts', posts);
        const postsLikedByUser = posts.filter((post) => isLiked[post._id]);
        setFavoritePosts(postsLikedByUser);
        console.log(postsLikedByUser);
        return postsLikedByUser;
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

    return { handleLike, handleComment, handleShare, handleSave, getFavoritePosts, isLiked, favoritePosts };
}