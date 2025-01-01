import { Typography } from 'antd';
import React from 'react'
import Posts from './Posts';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

export default function PostFeedback({ userDetails, allUsers, posts, isLoading, error, handleLike, handleComment, handleShare, deletePostById }) {

    if (isLoading) return <Loading />;
    if (error) return <Error errorMeassage={error} />;
    if (posts && posts.length === 0) return <Typography>There is no posts yet 🙁</Typography>;

    if (posts) {
        return (
            <Posts
                posts={posts}
                allUsers={allUsers}
                userDetails={userDetails}
                handleLike={handleLike}
                handleComment={handleComment}
                handleShare={handleShare}
                deletePostById={deletePostById}  // שולח את הפונקציה עם עדכון הסטייט
            />
        );
    }

    return null;
}
