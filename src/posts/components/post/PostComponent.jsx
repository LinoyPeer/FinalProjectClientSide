import { Card } from 'antd';
import React from 'react';
import PostHeaderComponent from './PostHeaderComponent';
import PostBodyComponent from './PostBodyComponent';
import PostFooterComponent from './PostFooterComponent';
import { useAuth } from '../../../providers/AuthProvider';

export default function PostComponent({ post, handleLike, handleComment, isLiked }) {
    const { userDetails } = useAuth();

    return (
        <Card style={{ width: 300, textAlign: 'center' }}>
            <PostHeaderComponent
                title={post.title}
                postStatus={post.postStatus}
            />
            <PostBodyComponent
                imageSrc={post.image.path}
                imageAlt={post.image.alt}

            >{`${userDetails && userDetails.name.first} ${userDetails && userDetails.name.middle} ${userDetails && userDetails.name.last}: ${post.postStatus}`}</PostBodyComponent>
            <PostFooterComponent
                postId={post._id}
                post={post}
                handleLike={handleLike}
                handleComment={handleComment}
                isLiked={isLiked}
            />
        </Card>
    );
}
