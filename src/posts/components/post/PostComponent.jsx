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
    const { userDetails } = useAuth();

    // טוען פוסטים לאחר שהקומפוננטה טוענה
    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    // בדוק אם הפוסטים נטענים ומכילים את ה-user_id לפני שמחפשים את המשתמש
    useEffect(() => {
        if (userDetails?._id) {
            console.log("userDetails._id", userDetails._id);
            console.log("posts:", posts);
            let currentUser = posts.find((item) => item.user_id === userDetails._id);
            setCurrentUserDetails(currentUser);
            console.log("currentUserDetails:", currentUser); // אם לא נמצא, תדפיס null
        }
    }, [userDetails, posts]);  // ודא שה-states 'userDetails' ו-'posts' קיימים קודם

    // אם לא נמצא מידע על המשתמש, מציג אייקון ברירת מחדל
    const avatar = userDetails?.image?.path ? (
        <Avatar src={userDetails.image.path} />
    ) : (
        <Avatar icon={<UserOutlined />} />
    );


    let optionOfTitle = currentUserDetails?.title || 'Unknown';

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
                {`${currentUserDetails ? currentUserDetails.title : 'Unknown'}: ${post?.postStatus || 'No status available'}`}
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
