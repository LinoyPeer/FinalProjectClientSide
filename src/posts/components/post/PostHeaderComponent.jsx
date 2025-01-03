import { MoreOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Modal, Row, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import usePosts from '../../hooks/usePosts';
import { useAuth } from '../../../providers/AuthProvider';

export default function PostHeaderComponent({ userNameOfPost, avatarPath, postId, deletePostById, post }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { getAllPosts } = usePosts();
    const { userDetails } = useAuth();

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    const currentPostId = postId;

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async () => {
        try {
            if (currentPostId) {
                console.log('Deleting post: ', currentPostId);
                await deletePostById(currentPostId);
            }
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    const shouldShowMoreIcon = () => {
        if (userDetails) {
            if (userDetails.isAdmin) {
                return true;
            } else if (userDetails.isBusiness && userDetails._id === post.user_id) {
                return true;
            } else if (!userDetails.isAdmin && !userDetails.isBusiness) {
                return false;
            }
        }
        return false;
    };

    return (
        <>
            <Row style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Col>
                    {shouldShowMoreIcon() && (
                        <MoreOutlined
                            style={{ fontSize: '20px' }}
                            onClick={showModal}
                        />
                    )}
                    <Modal
                        title="Post Options"
                        open={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <Button
                            type="primary"
                            danger
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Modal>
                </Col>
                <Col style={{ textAlign: 'left', flexGrow: 1 }}>
                    <Card.Meta
                        avatar={avatarPath}
                        title={<div style={{ fontWeight: 'bold' }}>{userNameOfPost}</div>}
                    />
                </Col>
            </Row>
            <Divider />
        </>
    );
}
