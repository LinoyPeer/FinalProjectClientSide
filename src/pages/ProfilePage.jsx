import { Avatar, Col, Row, Typography, Card, Divider, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import usePosts from '../posts/hooks/usePosts';
import { useAuth } from '../providers/AuthProvider';
import { EditOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { useReference } from '../providers/RefProvider';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/routes';
import { useSpring, animated } from '@react-spring/web';
import { useMediaQuery } from 'react-responsive';

const { Title } = Typography;

export default function ProfilePage() {
    const { posts, getMyPosts, setPosts, deletePostById } = usePosts();
    const { userDetails } = useAuth();
    const { handlePostClick } = useReference();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [bio, setBio] = useState('Welcome to my InstaPost profile page!');
    const [editMode, setEditMode] = useState(false);
    const [shakingPosts, setShakingPosts] = useState([]);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    // Media query to detect if it's a mobile or desktop screen
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    useEffect(() => {
        if (userDetails) {
            if (!userDetails.isBusiness && !userDetails.isAdmin) {
                navigate(ROUTES.UNAUTHORIZED); // אם המשתמש לא מאושר, הפנייה לדף לא מורשה
            }
        }
    }, [userDetails, navigate]);
    useEffect(() => {
        if (!userDetails) {
            navigate(ROUTES.UNAUTHORIZED); // אם המשתמש לא מאושר, הפנייה לדף לא מורשה
        }
    }, [userDetails, navigate]);

    useEffect(() => {
        if (userDetails?.bio) {
            setBio(userDetails.bio);
        }
    }, [userDetails?.bio]);

    useEffect(() => {
        getMyPosts();
    }, [getMyPosts]);

    const handleDeletePost = (postId) => {
        setPostToDelete(postId);
        setDeleteModalVisible(true);
    };

    const handleModalClose = () => {
        setDeleteModalVisible(false);
    };

    const confirmDeletePost = async () => {
        try {
            if (postToDelete) {
                await deletePostById(postToDelete, token);
                if (posts) {
                    setPosts(prevPosts => prevPosts.filter(post => post != undefined && post._id !== post != undefined && postToDelete));
                    setDeleteModalVisible(false);
                    setShakingPosts([]);
                    setEditMode(false);
                }
            } else {
                console.error('Post ID is not defined!');
            }
        } catch (e) {
            console.error('Failed to delete post:', e);
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
        if (!editMode) {
            setShakingPosts(posts.filter(post => post._id).map(post => post._id));
        } else {
            setShakingPosts([]);
        }
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
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', marginTop: '2em', marginBottom: '4em', marginLeft: !isMobile && '4em' }}>
                <Avatar size={40} style={{ marginLeft: '2em', marginBottom: '-1vh', width: !isMobile && '60px', height: !isMobile && '60px' }} src={userDetails?.image?.path} />
                <Title level={2} style={{ fontSize: isMobile ? '17px' : '23px', color: '#000', fontFamily: 'Tahoma', fontWeight: '100' }}>
                    {fullNameOfUser || 'User Name'}
                    <EditOutlined style={{ marginLeft: '20px' }} onClick={toggleEditMode} />
                    <SettingOutlined style={{ marginLeft: '20px' }} onClick={() => navigate(ROUTES.PROFILE_SETTINGS)} />
                </Title>
            </div>

            <div style={{ marginTop: '-2em', marginLeft: '2em', display: 'flex', flexDirection: 'row', marginRight: '1em' }}>
                <Typography style={{ fontWeight: '600', marginRight: '10px', color: '#3D52A0', marginLeft: !isMobile && '6em' }}>
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
                        post && post._id ? (
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
                                            width: isMobile ? '100%' : '80%', // תמונה קטנה יותר בדסקטופ
                                            // width: '100%',
                                            borderRadius: '8px',
                                            height: '50%',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        }}
                                        cover={
                                            <img
                                                src={post?.image?.path}
                                                alt="Post image"
                                                style={{
                                                    width: '100%', // תמונה קטנה יותר בדסקטופ
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
                        ) : null
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </Row>

            <Modal
                title="Delete Post"
                open={isDeleteModalVisible}
                onCancel={handleModalClose}
                footer={[
                    <button key="cancel" onClick={handleModalClose}>
                        Cancel
                    </button>,
                    <button key="accept" onClick={confirmDeletePost}>
                        Delete
                    </button>,
                ]}
            >
                <p>Are you sure you want to delete this post?</p>
            </Modal>
        </>
    );
}
