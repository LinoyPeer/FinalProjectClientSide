import { Col, Row } from 'antd';
import React, { useEffect } from 'react';

import PostComponent from '../components/post/PostComponent';
import { useAuth } from '../../providers/AuthProvider';
import usePostsActions from '../hooks/usePostsActions';

export default function MyFavoritePosts() {
    const { favoritePosts } = usePostsActions(); // מקבל את הפוסטים האהובים מההוק שלך

    return (
        <>
            <Row
                style={{ marginBottom: '20px', marginTop: '100px', width: '80%', margin: '0 auto' }}
                gutter={20}
            >
                {favoritePosts.map((post) => (
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
                ))}
            </Row>
        </>
    );
}
