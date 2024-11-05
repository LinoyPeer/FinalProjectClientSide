import React, { useEffect } from 'react';
import PageHeader from '../../components/pageHeader';
import PostFeedback from '../components/PostFeedback';
import usePosts from '../hooks/usePosts';
import usePostsAction from '../hooks/usePostsActions';

export default function PostsPage() {
    const { posts, isLoading, error, getAllPosts } = usePosts();

    const { handleLike, handleComment, isLiked } = usePostsAction();

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <>
            <PageHeader
                title="What's new?!"
                subtitle="Upload your post"
            />
            <PostFeedback
                posts={posts}
                handleLike={handleLike}
                handleComment={handleComment}
                isLoading={isLoading}
                error={error}
                isLiked={isLiked}
            />
        </>
    );
}
