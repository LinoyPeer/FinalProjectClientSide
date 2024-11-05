import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/pageHeader';
import usePostsActions from '../hooks/usePostsActions';

export default function MyFavoritePosts() {
    const { getFavoritePosts } = usePostsActions();
    const [favoritePosts, setFavoritePosts] = useState([]);

    useEffect(() => {
        setFavoritePosts(getFavoritePosts());
    }, [getFavoritePosts]);

    return (
        <>
            <PageHeader
                title="My Likes"
                subtitle="Let's see what you've liked"
            />
            <div>
                {favoritePosts.map(post => (
                    <div key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
