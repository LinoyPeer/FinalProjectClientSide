import { Avatar, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import PostHeaderComponent from './PostHeaderComponent';
import PostBodyComponent from './PostBodyComponent';
import PostFooterComponent from './PostFooterComponent';
import { UserOutlined } from '@ant-design/icons';
import usePosts from '../../hooks/usePosts';
import useUsers from '../../../users/hooks/useUsers';

export default function PostComponent({ post, handleLike, handleComment, isLiked }) {
    const { getAllPosts } = usePosts();
    const { allUsers, getAllUsers } = useUsers();
    const [currentUserDetails, setCurrentUserDetails] = useState(null);

    // קריאת פוסטים
    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    // קריאת משתמשים
    useEffect(() => {
        getAllUsers();
    }, []);

    // חיפוש פרטי המשתמש שפרסם את הפוסט
    useEffect(() => {
        if (post && allUsers.length > 0) {
            const postCreator = post?.user_id;

            const currentUser = allUsers.find((user) => user._id === postCreator);

            if (currentUser) {
                setCurrentUserDetails(currentUser); // עדכון הסטייט עם פרטי המשתמש
            } else {
                console.log('User not found for post');
            }
        }
    }, [allUsers, post]);

    // אם יש תמונה עבור המשתמש שפרסם את הפוסט, מציגים אותה
    const avatar = currentUserDetails?.image?.path ? (
        <Avatar src={currentUserDetails.image.path} />
    ) : (
        <Avatar icon={<UserOutlined />} />
    );

    console.log('currentUserDetails: ', currentUserDetails);

    let fullNameOfUser = `${currentUserDetails?.name?.first || ''} ${currentUserDetails?.name?.middle || ''} ${currentUserDetails?.name?.last || ''} `

    return (
        <Card style={{ width: 300, textAlign: 'center' }}>
            <PostHeaderComponent
                userNameOfPost={currentUserDetails ? fullNameOfUser : 'Unknown'}
                avatarPath={avatar}
            />
            <PostBodyComponent
                imageSrc={post?.image?.path || 'default_image_path'}
                imageAlt={post?.image?.alt || 'default_image_alt'}
            >
                <span style={{ fontWeight: 'bold' }}>
                    {currentUserDetails ? fullNameOfUser : 'Unknown'}
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
