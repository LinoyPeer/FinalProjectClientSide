import { Card } from 'antd';
import React from 'react';
import PostHeaderComponent from './PostHeaderComponent';
import PostBodyComponent from './PostBodyComponent';
import PostFooterComponent from './PostFooterComponent';

export default function PostComponent({ post }) {

    return (
        <Card
            style={{ width: 300, textAlign: 'center' }}
        >
            <PostHeaderComponent
                title={post.title}
                description={post.description}
            />
            <PostBodyComponent
                imageSrc={post.image.url}
                imageAlt={post.image.alt}
            />
            <PostFooterComponent />
        </Card>
    );
}
