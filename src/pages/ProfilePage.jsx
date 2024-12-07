import { Avatar, Col, Row, Typography, Card, Divider } from 'antd';
import React, { useEffect } from 'react';
import usePosts from '../posts/hooks/usePosts';
import { useAuth } from '../providers/AuthProvider';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import { useReference } from '../providers/RefProvider';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/routes';

const { Title } = Typography;

export default function ProfilePage() {
    const { posts, getMyPosts } = usePosts();
    const { userDetails } = useAuth();
    const { handlePostClick } = useReference();
    const navigate = useNavigate();

    useEffect(() => {
        getMyPosts();
    }, [getMyPosts]);

    let fullNameOfUser = `${userDetails?.name?.first || ''} ${userDetails?.name?.middle || ''} ${userDetails?.name?.last || ''} `;

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', marginTop: '2em', marginBottom: '4em' }}>
                <Avatar size={40} style={{ marginLeft: '2em', marginBottom: '-1vh' }} src={userDetails?.image?.path} />
                <Title level={2} style={{ fontSize: '17px', color: '#000', fontFamily: 'Tahoma', fontWeight: '100' }}>
                    {fullNameOfUser || 'User Name'}
                    <EditOutlined style={{ marginLeft: '20px' }} />
                    <SettingOutlined style={{ marginLeft: '20px' }} onClick={() => navigate(ROUTES.PROFILE_SETTINGS)} />
                </Title>
            </div>
            <Divider />

            <Row style={{ width: '80%', margin: '0 auto' }} gutter={16}>
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (
                        <Col
                            key={post._id}
                            xs={8} sm={12} md={8} lg={6}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: '-16px',
                            }}
                        >
                            <Card
                                hoverable
                                style={{
                                    width: '100%',
                                    borderRadius: '8px',
                                    height: '50%',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                }}
                                cover={
                                    <img
                                        src={post?.image?.path}
                                        alt="Post image"
                                        style={{
                                            width: '100%',
                                            aspectRatio: '1',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                        }}
                                        onClick={() => handlePostClick(post._id)}
                                    />
                                }
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
