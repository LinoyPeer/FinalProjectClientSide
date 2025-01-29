import React, { useEffect, useState } from 'react';
import usePostsActions from '../hooks/usePostsActions';
import usePosts from '../hooks/usePosts';
import { useAuth } from '../../providers/AuthProvider';
import PostComponent from '../components/post/PostComponent';
import useUsers from '../../users/hooks/useUsers';
import { Row, Col } from 'antd';
import PageHeader from '../../components/PageHeader';

export default function MyFavoritePosts() {
    const { handleLike, handleComment } = usePostsActions();
    const { getAllPosts, posts, setPosts } = usePosts();
    const { getAllUsers, allUsers } = useUsers();
    const { user } = useAuth();
    const [likedPostsState, setLikedPostsState] = useState({});

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleLikeClick = async (postId) => {
        if (!posts || !Array.isArray(posts)) return;
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

    const likedPosts = Array.isArray(posts)
        ? posts.filter((post) => post.likes && Array.isArray(post.likes) && post.likes.includes(user._id))
        : [];

    return (
        <>
            <PageHeader title={'My Favorite Posts'} subtitle={'See my likes on InstaPost'} />
            <div style={{ padding: '20px' }}>
                {likedPosts.length > 0 ? (
                    <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                        {likedPosts.map(post => (
                            <Col
                                key={post._id}
                                xs={24} sm={12} md={8} lg={6}
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <PostComponent
                                    allUsers={allUsers}
                                    post={post}
                                    handleLike={handleLikeClick}
                                    handleComment={handleComment}
                                    isLiked={likedPostsState[post._id] || post.likes.includes(user._id)}
                                />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p>You have no favorite posts.</p>
                )}
            </div>
        </>
    );
}
