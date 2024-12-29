import { MoreOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Modal, Row, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import usePosts from '../../hooks/usePosts';

export default function PostHeaderComponent({ userNameOfPost, avatarPath, postId }) {
    const [isModalVisible, setIsModalVisible] = useState(false);  // סטייט לשלוט על הצגת ה-modal
    const { deletePostById, getAllPosts } = usePosts();

    useEffect(() => {
        getAllPosts();  // ודא שאתה מקבל את כל הפוסטים כאשר הרכיב טוען
    }, [getAllPosts]);

    // כאן אנחנו לא צריכים לחפש את הפוסט, כי כבר קיבלנו אותו כפרופס
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
                await deletePostById(currentPostId);  // מחיקת הפוסט לפי ה-ID
                setIsModalVisible(false);
            }
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
