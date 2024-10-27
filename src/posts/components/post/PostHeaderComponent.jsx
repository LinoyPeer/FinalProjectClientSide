import { MoreOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Col, Divider, Row } from 'antd'
import React from 'react'

export default function PostHeaderComponent({ title, postStatus }) {
    return (
        <>
            <Row style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Col >
                    <MoreOutlined style={{ fontSize: '20px' }} />
                </Col>
                <Col
                    style={{ textAlign: 'left', flexGrow: 1 }}>
                    <Card.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={title}
                    />
                </Col>
            </Row>
            <Divider variant='middle' />

        </>)
}
