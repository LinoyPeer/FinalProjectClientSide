import { MoreOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Modal, Row, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import usePosts from '../../hooks/usePosts';

export default function PostHeaderComponent({ userNameOfPost, avatarPath }) {
    const [isModalVisible, setIsModalVisible] = useState(false);  // סטייט לשלוט על הצגת ה-modal
    const { deletePostById, getAllPosts, posts } = usePosts();

    useEffect(() => {
        getAllPosts();
    }, [])
    const postId = posts.map((post) => post._id)
    const currentPost = postId.find(p => p._id === postId);


    console.log('postId: ', postId);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = async () => {
        try {
            await deletePostById(currentPost);
            setIsModalVisible(false);
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    return (
        <>
            <Row style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Col>
                    <MoreOutlined
                        style={{ fontSize: '20px' }}
                        onClick={showModal}
                    />
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
