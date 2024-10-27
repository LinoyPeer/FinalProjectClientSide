import { CommentOutlined, LikeOutlined, SaveOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import React from 'react'

export default function PostFooterComponent({ postId, handleLike, handleComment }) {
    return (
        <>
            <Space size="large" style={{ justifyContent: 'center', display: 'flex', gap: '4em' }}>
                <LikeOutlined style={{ fontSize: '1.3em' }} onClick={() => handleLike(postId)} />
                <CommentOutlined style={{ fontSize: '1.3em' }} onClick={() => handleComment(postId)} />
                <ShareAltOutlined style={{ fontSize: '1.3em' }} />
                <SaveOutlined style={{ fontSize: '1.3em' }} />
            </Space>

        </>
    )
}
