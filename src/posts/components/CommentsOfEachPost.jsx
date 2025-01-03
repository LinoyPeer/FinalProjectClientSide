import { useParams } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import usePosts from "../hooks/usePosts";
import { useEffect, useState } from "react";
import Joi from "joi";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import usePostsActions from "../hooks/usePostsActions";

export default function CommentsOfEachPost({ postId }) {
    const { userDetails } = useAuth();
    const { posts, getAllPosts, setPosts } = usePosts();
    const { updatePostComments } = usePostsActions();
    const [selectedPost, setSelectedPost] = useState();
    const [commentData, setCommentData] = useState({ comment: '' });
    const [errors, setErrors] = useState({});

    const schema = {
        comment: Joi.string().min(1).max(500).required().label('Comment')
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCommentData({ ...commentData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validation = Joi.object(schema).validate(commentData);

        if (validation.error) {
            setErrors({ comment: validation.error.details[0].message });
            return;
        }

        setErrors({});

        if (selectedPost) {
            const newComment = {
                userName: {
                    first: userDetails?.name?.first,
                    middle: userDetails?.name?.middle || '',
                    last: userDetails?.name?.last,
                },
                userId: userDetails?.id,
                userImage: userDetails?.image.path,
                comment: commentData.comment,
                commentId: new Date().getTime(),
                createdAt: new Date().toISOString(),
            };

            updatePostComments(postId, newComment, userDetails.token);

            setSelectedPost((prevPost) => {
                return {
                    ...prevPost,
                    comments: [...prevPost.comments, newComment],
                };
            });

            setCommentData({ comment: '' });
        }
    };

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    useEffect(() => {
        if (posts && postId) {
            const foundPost = posts.find((post) => post._id === postId);
            setSelectedPost(foundPost);
        }
    }, [postId, posts]);

    return (
        <div style={styles.container}>
            {selectedPost ? (
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="comment"
                            placeholder="Write your comment here..."
                            type="text"
                            value={commentData.comment}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        {errors.comment && <div style={{ color: 'red' }}>{errors.comment}</div>}
                        <button
                            type="submit"
                            disabled={!commentData.comment || errors.comment}
                            style={styles.submitButton}
                        >
                            Submit Comment
                        </button>
                    </form>

                    <div style={styles.commentsList}>
                        <h4 style={styles.commentsTitle}>Comments:</h4>
                        {selectedPost.comments && selectedPost.comments.length > 0 ? (
                            <ul style={styles.commentsContainer}>
                                {selectedPost.comments.map((comment, index) => (
                                    <li key={comment.commentId || index} style={styles.commentItem}>
                                        <div style={styles.commentHeader}>
                                            <Avatar
                                                alt="User Avatar"
                                                style={styles.userAvatar}
                                                src={comment?.userImage}
                                            >
                                                {!comment?.userImage && <UserOutlined style={styles.defaultAvatar} />}
                                            </Avatar>

                                            <div style={styles.userInfo}>
                                                <strong style={styles.userName}>
                                                    {comment?.userName?.first} {comment?.userName?.middle} {comment?.userName?.last}
                                                </strong>
                                                <p style={styles.commentDate}>
                                                    {new Date(comment.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <p style={styles.commentText}>
                                            {comment.comment.length > 200
                                                ? comment.comment.slice(0, 200) + '...'
                                                : comment.comment}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Post not found.</p>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        width: '100%',
        marginBottom: '20px',
    },
    commentsList: {
        marginTop: '20px',
    },
    commentsTitle: {
        fontSize: '18px',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    commentsContainer: {
        listStyleType: 'none',
        paddingLeft: '0',
    },
    commentItem: {
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    commentHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    userAvatar: {
        marginRight: '10px',
        marginTop: '-20px',
        width: '43px',
        height: '43px',
    },
    avatarImage: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
    },
    defaultAvatar: {
        fontSize: '16px',
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: '15px',
        position: 'relative',
        left: '1vh',
        top: '1vh',
    },
    commentDate: {
        fontSize: '12px',
        color: '#888',
    },
    commentText: {
        fontSize: '14px',
        color: '#333',
    }
};
