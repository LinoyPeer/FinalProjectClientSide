import React, { useEffect } from 'react';
import PageHeader from '../../components/pageHeader';
import PostFeedback from '../components/PostFeedback';
import usePosts from '../hooks/usePosts';
import usePostsAction from '../hooks/usePostsActions';
import { Modal } from 'antd';
import ChatsViewPage from '../../pages/ChatsViewPage';

export default function PostsPage() {
    const { posts, isLoading, error, getAllPosts } = usePosts();
    const { handleLike, handleComment, handleShare, isModalVisible, handleCancelModal } = usePostsAction();

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <>
            <Modal
                title="Share Post"
                open={isModalVisible}
                onCancel={handleCancelModal}
                footer={null}
            >
                <ChatsViewPage />
            </Modal>

            <PageHeader
                title="What's new?!"
                subtitle="Upload your post"
            />
            <PostFeedback
                posts={posts}
                handleLike={handleLike}
                handleComment={handleComment}
                handleShare={handleShare}
                isLoading={isLoading}
                error={error}
            />
        </>
    );
}
