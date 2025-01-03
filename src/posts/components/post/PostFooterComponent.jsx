import { CommentOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Space, Modal } from "antd";
import { useAuth } from "../../../providers/AuthProvider";
import usePostsActions from "../../hooks/usePostsActions";
import { useState } from "react";
import CommentsOfEachPost from "../CommentsOfEachPost";

export default function PostFooterComponent({ post, handleLike, handleComment, }) {
    const { setPosts } = usePostsActions();
    const { user } = useAuth();
    const [isLiked, setIsLiked] = useState(post.likes.includes(user && user._id));
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);

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

    const handleCommentClick = () => {
        setCurrentPostId(post._id);
        setIsModalVisible(true);
    };

    return (
        <>
            <Space size="large" style={{ justifyContent: 'center', display: 'flex', gap: '4em' }}>
                {user.isBusiness ? (
                    <>
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
                        <CommentOutlined style={{ fontSize: '1.3em' }} onClick={handleCommentClick} />
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </Space>

            <Modal
                title="Comments"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={800}
                style={{
                    top: 20,
                    padding: '10px',
                }}
            >
                {currentPostId && <CommentsOfEachPost postId={currentPostId} />}
            </Modal>
        </>
    );
}
