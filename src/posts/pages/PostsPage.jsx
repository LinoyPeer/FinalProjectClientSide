import React, { useCallback, useEffect, useState } from 'react';
import PageHeader from '../../components/pageHeader';
import Posts from '../components/Posts';
import axios from 'axios';

export default function PostsPage() {
    const [posts, setPosts] = useState([]);

    const apiUrl = "http://localhost:8181/posts";

    const getAllCardsApi = async () => {
        try {
            let response = await axios.get(apiUrl);
            return response.data;
        } catch (err) {
            console.log(err.message);
        }
    };

    const getAllPosts = useCallback(async () => {
        try {
            const cardsData = await getAllCardsApi();
            if (cardsData) {
                console.log(cardsData);
                setPosts(cardsData);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    return (
        <>
            <PageHeader
                title="What's new?!"
                subtitle="Upload your post"
            />
            <Posts posts={posts} />
        </>
    );
}
