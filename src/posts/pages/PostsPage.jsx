import React, { useEffect } from 'react';
import PostFeedback from '../components/PostFeedback';
import usePosts from '../hooks/usePosts';
import usePostsAction from '../hooks/usePostsActions';
import useUsers from '../../users/hooks/useUsers';
import { useAuth } from '../../providers/AuthProvider';
import PageHeader from '../../components/PageHeader';



export default function PostsPage() {
    const { posts, isLoading, error, getAllPosts, setPosts } = usePosts();
    const { allUsers, getAllUsers } = useUsers();
    const { userDetails } = useAuth();
    const { handleLike, handleComment, deletePostById } = usePostsAction();

    const deletePostAndUpdate = async (postId) => {
        try {
            await deletePostById(postId);
            setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
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
                deletePostById={deletePostAndUpdate}
            />
            <br></br><br></br><p></p>
        </>
    );
}
