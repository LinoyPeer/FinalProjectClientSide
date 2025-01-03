
import { Avatar, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import PostHeaderComponent from './PostHeaderComponent';
import PostBodyComponent from './PostBodyComponent';
import PostFooterComponent from './PostFooterComponent';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../../providers/AuthProvider';

export default function PostComponent({ allUsers, post, handleLike, handleComment, isLiked, deletePostById }) {
    const { userDetails } = useAuth();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (post && allUsers.length > 0) {
            const postCreator = post?.user_id;
            const currentUser = allUsers.find((user) => user._id === postCreator);

            setCurrentUser(currentUser);
        }
    }, [allUsers, post]);


    if (!userDetails || !currentUser) {
        return <div>Loading...</div>;
    }

    const avatar = currentUser?.image?.path ? (
        <Avatar src={currentUser?.image?.path} />
    ) : (
        <Avatar icon={<UserOutlined />} />
    );

    let fullNameOfUser = `${currentUser?.name?.first || ''} ${currentUser?.name?.middle || ''} ${currentUser?.name?.last || ''}`;

    return (
        <Card style={{ width: 300, textAlign: 'center' }}>
            <PostHeaderComponent
                postId={post._id}
                post={post}
                userNameOfPost={fullNameOfUser || 'Unknown'}
                avatarPath={avatar}
                deletePostById={deletePostById}

            />
            <PostBodyComponent
                imageSrc={post?.image?.path || 'default_image_path'}
                imageAlt={post?.image?.alt || 'default_image_alt'}
            >
                <span style={{ fontWeight: 'bold' }}>
                    {fullNameOfUser || 'Unknown'}
                </span>
                {`: ${post?.postStatus || 'No status available'}`}
            </PostBodyComponent>
            <PostFooterComponent
                post={post}
                handleLike={handleLike}
                handleComment={handleComment}
                isLiked={isLiked}
            />
        </Card>
    );
}
