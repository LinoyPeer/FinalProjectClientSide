import { CommentOutlined, LikeOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import React from 'react'

export default function PostFooterComponent() {
    return (
        <>
            <Space size="large" style={{ justifyContent: 'center', display: 'flex', gap: '3em' }}>
                <LikeOutlined style={{ fontSize: '1.5em' }} />
                <CommentOutlined style={{ fontSize: '1.5em' }} />
                <ShareAltOutlined style={{ fontSize: '1.5em' }} />
            </Space>

        </>
    )
}
