import { Avatar, Col, Row } from 'antd'
import React from 'react'
import { useAuth } from '../providers/AuthProvider'

export default function ProfilePage({ posts = [], handleLike, handleComment, isLiked }) {
    const { user } = useAuth();
    console.log(JSON.stringify(user, null, 2));
    console.log('posts: ', posts);
    const userPosts = posts.filter(post => post.user_id === user._id);
    console.log("User Posts:", userPosts);


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
                {Array.isArray(userPosts) && userPosts.length > 0 ? (
                    userPosts.map((post) => (
                        <Col
                            key={post._id}
                            xs={24} sm={12} md={8} lg={6}
                            style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
                        >
                            <PostComponent
                                post={post}
                                handleLike={handleLike}
                                handleComment={handleComment}
                                isLiked={isLiked[post._id]}
                            />
                        </Col>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </Row>
        </>
    )
}
