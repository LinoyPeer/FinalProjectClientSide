import { UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Divider } from 'antd'
import React from 'react'

export default function PostHeaderComponent({ title, description }) {
    return (
        <>
            <Card.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={title}
                description={description}
            />
            <Divider variant='middle' />
        </>)
}
