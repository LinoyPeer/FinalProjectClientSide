import { CommentOutlined, LikeFilled, LikeOutlined, SaveOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { useAuth } from "../../../providers/AuthProvider";
import usePostsActions from "../../hooks/usePostsActions";
import { useEffect, useState } from "react";


export default function PostFooterComponent({ post, handleLike, handleComment }) {
    const { setPosts } = usePostsActions();
    const { user } = useAuth();
    const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));

    const handleLikeClick = async () => {

        await handleLike(post._id);

        setIsLiked((prevIsLiked) => !prevIsLiked);

        setPosts((prevPosts) => {
            return prevPosts.map((p) =>
                p._id === post._id
                    ? { ...p, likes: isLiked ? p.likes.filter((id) => id !== user._id) : [...p.likes, user._id] }
                    : p
            );
        });
    };

    useEffect(() => {
        console.log(isLiked);
    }, [isLiked]);

    return (
        <Space size="large" style={{ justifyContent: 'center', display: 'flex', gap: '4em' }}>
            {isLiked ? (
                <LikeFilled
                    style={{ fontSize: '1.3em', color: '#1890ff' }}
                    onClick={handleLikeClick}
                />
            ) : (
                <LikeOutlined
                    style={{ fontSize: '1.3em' }}
                    onClick={handleLikeClick}
                />
            )}
            <CommentOutlined style={{ fontSize: '1.3em' }} onClick={() => handleComment(post._id)} />
            <ShareAltOutlined style={{ fontSize: '1.3em' }} />
            <SaveOutlined style={{ fontSize: '1.3em' }} />
        </Space>
    );
}
