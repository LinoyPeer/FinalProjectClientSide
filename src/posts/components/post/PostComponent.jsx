import { Avatar, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import PostHeaderComponent from './PostHeaderComponent';
import PostBodyComponent from './PostBodyComponent';
import PostFooterComponent from './PostFooterComponent';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../../providers/AuthProvider';
import usePosts from '../../hooks/usePosts';

export default function PostComponent({ post, handleLike, handleComment, isLiked }) {
    const { posts, getAllPosts } = usePosts();
    const [currentUserDetails, setCurrentUserDetails] = useState(null);
    const { userDetails, isLoggedIn } = useAuth();

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    useEffect(() => {
        if (userDetails && userDetails._id && posts.length > 0) {
            // חפש את המשתמש שיצר את הפוסט לפי user_id של הפוסט
            let postCreator = posts.find((item) => item._id === post._id)?.user_id;
            console.log('postCreator:', postCreator);

            // מצא את פרטי המשתמש שיצר את הפוסט
            let currentUser = posts.find((item) => item.user_id === postCreator);

            // אם נמצא, עדכן את currentUserDetails
            if (currentUser) {
                setCurrentUserDetails(currentUser);
            } else {
                console.log('User not found for post');
            }
        }
    }, [userDetails, posts, post]); // עדכון כל פעם ש-userDetails, posts או post משתנים

    const avatar = isLoggedIn && currentUserDetails?.image?.path ? (
        <Avatar src={currentUserDetails.image.path} />
    ) : (
        <Avatar icon={<UserOutlined />} />
    );

    let optionOfTitle = currentUserDetails?.title || 'Unknown';
    console.log('currentUserDetails: ', currentUserDetails);

    return (
        <Card style={{ width: 300, textAlign: 'center' }}>
            <PostHeaderComponent
                userNameOfPost={optionOfTitle}
                avatarPath={avatar}
            />
            <PostBodyComponent
                imageSrc={post?.image?.path || 'default_image_path'}
                imageAlt={post?.image?.alt || 'default_image_alt'}
            >
                <span style={{ fontWeight: 'bold' }}>
                    {currentUserDetails ? currentUserDetails.title : 'Unknown'}
                </span>
                {`: ${post?.postStatus || 'No status available'}`}
            </PostBodyComponent>
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
