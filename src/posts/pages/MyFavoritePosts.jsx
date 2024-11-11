import React, { useEffect } from 'react';
import usePostsActions from '../hooks/usePostsActions';
import { Col, Row } from 'antd';
import PostComponent from '../components/post/PostComponent';
import PageHeader from '../../components/pageHeader';

export default function MyFavoritePosts() {
    const { getFavoritePosts, handleLike, handleComment, isLiked, favoritePosts } = usePostsActions();

    useEffect(() => {
        getFavoritePosts();
    }, [getFavoritePosts]);

    return (
        <>
            <PageHeader
                title="My Likes"
                subtitle="Let's see what you've liked"
            />
            <Row
                style={{ marginBottom: '20px', marginTop: '100px', width: '80%', margin: '0 auto' }}
                gutter={20}
            >
                {Array.isArray(favoritePosts) && favoritePosts.length > 0 ? (
                    favoritePosts.map((post) => (
                        <Col
                            key={post._id}
                            xs={24} sm={12} md={8} lg={6}
                            style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
                        >
                            <PostComponent
                                post={post}
                                handleLike={handleLike}
                                handleComment={handleComment}
                                isLiked={isLiked[post._id]} // מקבל את מצב הלייק עבור הפוסט הספציפי
                            />
                        </Col>
                    ))
                ) : (
                    <p>No favorite posts available</p>
                )}
            </Row>
        </>
    );
}



