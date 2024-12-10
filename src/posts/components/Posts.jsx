import React, { useEffect } from 'react';
import PostComponent from './post/PostComponent';
import { Col, Row } from 'antd';
import { useReference } from '../../providers/RefProvider';

export default function Posts({ userDetails, allUsers, posts, handleLike, handleComment, handleShare }) {
    const { postRefs, setPostRef } = useReference();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('postId');

        if (postId && postRefs.current[postId]) {
            postRefs.current[postId].scrollIntoView({ behavior: 'smooth' });
        }
    }, [postRefs]);

    return (
        <Row style={{ marginBottom: '20px', marginTop: '100px', width: '80%', margin: '0 auto' }} gutter={20}>
            {Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post) => (
                    <Col key={post._id} xs={24} sm={12} md={8} lg={6} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <PostComponent
                            post={post}
                            allUsers={allUsers}
                            userDetails={userDetails}
                            PostId={post._id}
                            handleLike={handleLike}
                            handleComment={handleComment}
                            handleShare={handleShare}
                        />
                        <p ref={(el) => setPostRef(post._id, el)}></p>
                    </Col>
                ))
            ) : (
                <p>No posts available</p>
            )}
        </Row>
    );
}
