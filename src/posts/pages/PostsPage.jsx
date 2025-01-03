import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/pageHeader';
import PostFeedback from '../components/PostFeedback';
import usePosts from '../hooks/usePosts';
import usePostsAction from '../hooks/usePostsActions';
import { Modal } from 'antd';
import ChatsViewPage from '../../pages/ChatsViewPage';
import useUsers from '../../users/hooks/useUsers';
import { useAuth } from '../../providers/AuthProvider';

export default function PostsPage() {
    const { posts, isLoading, error, getAllPosts, setPosts } = usePosts(); // הוספנו את setPosts
    const { allUsers, getAllUsers } = useUsers();
    const { userDetails } = useAuth();
    const { handleLike, handleComment, isModalVisible, handleCancelModal, deletePostById } = usePostsAction();

    const deletePostAndUpdate = async (postId) => {
        try {
            await deletePostById(postId); // מחיקת הפוסט
            setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId)); // עדכון הסטייט כך שהפוסט יימחק מיד
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    useEffect(() => {
        getAllPosts();
        getAllUsers();
    }, []);

    return (
        <>
            <PageHeader
                title="What's new?!"
                subtitle="Upload your post"
            />
            <PostFeedback
                posts={posts}
                allUsers={allUsers}
                userDetails={userDetails}
                handleLike={handleLike}
                handleComment={handleComment}
                isLoading={isLoading}
                error={error}
                deletePostById={deletePostAndUpdate}  // הפונקציה המעודכנת שמעדכנת את הסטייט
            />
            <br></br><br></br><p></p>
        </>
    );
}
