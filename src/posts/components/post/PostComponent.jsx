import { Card } from 'antd';
import React from 'react';
import PostHeaderComponent from './PostHeaderComponent';
import PostBodyComponent from './PostBodyComponent';
import PostFooterComponent from './PostFooterComponent';

export default function PostComponent({ post, handleLike, handleComment, isLiked }) {
    return (
        <Card style={{ width: 300, textAlign: 'center' }}>
            <PostHeaderComponent
                title={post.title}
                postStatus={post.postStatus}
            />
            <PostBodyComponent
                imageSrc={post.image.url}
                imageAlt={post.image.alt}
            />
            <PostFooterComponent
                postId={post._id}
                handleLike={handleLike}
                handleComment={handleComment}
                isLiked={isLiked}
            />
        </Card>
    );
}
