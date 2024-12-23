import { MoreOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Row } from 'antd';
import React from 'react';

export default function PostHeaderComponent({ userNameOfPost, avatarPath }) {


    return (
        <>
            <Row style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Col>
                    <MoreOutlined style={{ fontSize: '20px' }} />
                </Col>
                <Col style={{ textAlign: 'left', flexGrow: 1 }}>
                    <Card.Meta
                        avatar={avatarPath}
                        title={<div style={{ fontWeight: 'bold' }}>{userNameOfPost}</div>}
                    />
                </Col>
            </Row>
            <Divider variant="middle" />
        </>
    );
}
