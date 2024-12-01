import { MoreOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Row } from 'antd';
import React from 'react';

export default function PostHeaderComponent({ userNameOfPost, avatarPath }) {
    const avatar = avatarPath ? (
        <Avatar src={avatarPath} />
    ) : (
        <Avatar icon={<UserOutlined />} />
    );

    return (
        <>
            <Row style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Col>
                    <MoreOutlined style={{ fontSize: '20px' }} />
                </Col>
                <Col style={{ textAlign: 'left', flexGrow: 1 }}>
                    <Card.Meta
                        avatar={avatar}
                        title={<div style={{ fontWeight: 'bold' }}>{userNameOfPost}</div>}
                    />
                </Col>
            </Row>
            <Divider variant="middle" />
        </>
    );
}
