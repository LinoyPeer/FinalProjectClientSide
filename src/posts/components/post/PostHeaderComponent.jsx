import { MoreOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Row } from 'antd';
import React from 'react';

export default function PostHeaderComponent({ userNameOfPost, avatarPath }) {
    // אם יש נתיב לתמונה, הצג את התמונה, אחרת השתמש באייקון ברירת מחדל
    const avatar = avatarPath ? (
        <Avatar src={avatarPath} /> // אם יש נתיב לתמונה, הצג את התמונה
    ) : (
        <Avatar icon={<UserOutlined />} /> // אם לא, השתמש באייקון של משתמש ברירת מחדל
    );

    return (
        <>
            <Row style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Col>
                    <MoreOutlined style={{ fontSize: '20px' }} />
                </Col>
                <Col style={{ textAlign: 'left', flexGrow: 1 }}>
                    <Card.Meta avatar={avatar} title={userNameOfPost} />
                </Col>
            </Row>
            <Divider variant="middle" />
        </>
    );
}
