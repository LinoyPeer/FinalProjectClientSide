import React, { useEffect, useState } from 'react';
import usePostsActions from '../hooks/usePostsActions';
import usePosts from '../hooks/usePosts';
import { useAuth } from '../../providers/AuthProvider';
import PostComponent from '../components/post/PostComponent';
import useUsers from '../../users/hooks/useUsers';
import PageHeader from '../../components/pageHeader';

export default function MyFavoritePosts() {
    const { handleLike, handleComment, handleShare } = usePostsActions();
    const { getAllPosts, posts, setPosts } = usePosts();
    const { getAllUsers, allUsers } = useUsers();
    const { user } = useAuth();
    const [likedPostsState, setLikedPostsState] = useState({});

    // קריאה להבא לשני ה-hooks, אחד בשביל פוסטים ואחד בשביל משתמשים
    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleLikeClick = async (postId) => {
        const post = posts.find(p => p._id === postId);
        if (!post) return;

        await handleLike(postId);

        setPosts((prevPosts) =>
            prevPosts.map((p) =>
                p._id === postId
                    ? {
                        ...p,
                        likes: p.likes.includes(user._id)
                            ? p.likes.filter((id) => id !== user._id)
                            : [...p.likes, user._id]
                    }
                    : p
            )
        );
    };

    // בדיקה אם posts הוא מערך תקני
    const likedPosts = Array.isArray(posts)
        ? posts.filter((post) => post.likes.includes(user._id))
        : [];

    return (
        <>
            <PageHeader title={'My Favorite Posts'} subtitle={'See my likes on InstaPost'} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', gap: '2em' }}>
                {likedPosts.length > 0 ? (
                    likedPosts.map(post => (
                        <PostComponent
                            key={post._id}
                            allUsers={allUsers}
                            post={post}
                            handleLike={handleLikeClick}
                            handleComment={handleComment}
                            handleShare={handleShare}
                            isLiked={likedPostsState[post._id] || post.likes.includes(user._id)}
                        />
                    ))
                ) : (
                    <p>You have no favorite posts.</p>
                )}
                <div style={{ height: '30px' }}></div>
            </div>
        </>
    );
}
