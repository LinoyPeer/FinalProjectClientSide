import React from 'react';
import PostComponent from './post/PostComponent';
import { Col, Row } from 'antd';

export default function Posts({ posts = [], handleLike, handleComment, handleShare }) {
    return (
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
                            PostId={post._id}
                            handleLike={handleLike}
                            handleComment={handleComment}
                            handleShare={handleShare}

                        />
                    </Col>
                ))
            ) : (
                <p>No posts available</p>
            )}
        </Row>
    );
}
