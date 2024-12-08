import { Avatar, Col, Row, Typography, Card, Divider, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import usePosts from '../posts/hooks/usePosts';
import { useAuth } from '../providers/AuthProvider';
import { EditOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { useReference } from '../providers/RefProvider';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/routes';
import usePostsActions from '../posts/hooks/usePostsActions';
import { useSpring, animated } from '@react-spring/web'; // ייבוא אנימציה

const { Title } = Typography;

export default function ProfilePage() {
    const { posts, getMyPosts } = usePosts();
    const { userDetails } = useAuth();
    const { handlePostClick } = useReference();
    const navigate = useNavigate();
    const { isModalVisible, handleCancelModal, handleMenu } = usePostsActions();

    const [bio, setBio] = useState('Welcome to my InstaPost profile page!');
    const [editMode, setEditMode] = useState(false);
    const [shakingPosts, setShakingPosts] = useState([]);

    useEffect(() => {
        if (userDetails?.bio) {
            setBio(userDetails.bio);
        }
    }, [userDetails?.bio]);

    useEffect(() => {
        getMyPosts();
    }, [getMyPosts]);

    const handleDeletePost = (postId) => {
        console.log("DELETED", postId);
    };

    const handleModalClose = () => {
        handleCancelModal();
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        setShakingPosts(posts.map((post) => post._id));
    };

    let fullNameOfUser = `${userDetails?.name?.first || ''} ${userDetails?.name?.middle || ''} ${userDetails?.name?.last || ''}`;

    const shakeStyle = useSpring({
        to: { transform: editMode ? 'translateX(5px)' : 'translateX(0px)' },
        from: { transform: 'translateX(0px)' },
        reset: true,
        reverse: editMode,
        config: { duration: 100 },
        loop: editMode ? { reverse: true } : false,
    });

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', marginTop: '2em', marginBottom: '4em' }}>
                <Avatar size={40} style={{ marginLeft: '2em', marginBottom: '-1vh' }} src={userDetails?.image?.path} />
                <Title level={2} style={{ fontSize: '17px', color: '#000', fontFamily: 'Tahoma', fontWeight: '100' }}>
                    {fullNameOfUser || 'User Name'}
                    <EditOutlined style={{ marginLeft: '20px' }} onClick={toggleEditMode} />
                    <SettingOutlined style={{ marginLeft: '20px' }} onClick={() => navigate(ROUTES.PROFILE_SETTINGS)} />
                </Title>
            </div>

            <div style={{ marginTop: '-2em', marginLeft: '2em', display: 'flex', flexDirection: 'row', marginRight: '1em' }}>
                <Typography style={{ fontWeight: '600', marginRight: '10px', color: '#3D52A0' }}>
                    Bio:
                </Typography>
                <Typography style={{ fontWeight: 'normal', color: 'black' }}>
                    {bio}
                </Typography>
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
                            <animated.div style={shakingPosts.includes(post._id) ? shakeStyle : {}}>
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
                                >
                                    {editMode && (
                                        <DeleteOutlined
                                            onClick={() => handleDeletePost(post._id)}
                                            style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                fontSize: '20px',
                                                color: 'black',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    )}
                                </Card>
                            </animated.div>
                        </Col>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </Row>
        </>
    );
}
