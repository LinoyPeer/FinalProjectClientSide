
import { Avatar, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import PostComponent from '../posts/components/post/PostComponent';
import usePostsAction from '../posts/hooks/usePostsActions';
import usePosts from '../posts/hooks/usePosts';

export default function ProfilePage() {
    const { posts, getMyPosts } = usePosts();
    const { handleLike, handleComment } = usePostsAction();

    useEffect(() => {
        getMyPosts();
    }, [getMyPosts]);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                <Avatar style={{ marginLeft: '3em', marginTop: '3em' }} />
                <p style={{ marginTop: '3.2em' }}>Linoy Pe'er</p>
            </div>
            <Row
                style={{ marginBottom: '20px', marginTop: '100px', width: '80%', margin: '0 auto' }}
                gutter={20}
            >
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (
                        <Col
                            key={post._id}
                            xs={24} sm={12} md={8} lg={6}
                            style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
                        >
                            <PostComponent
                                post={post}
                                handleLike={handleLike}
                                handleComment={handleComment}
                            />
                        </Col>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </Row>
        </>
    );
}
