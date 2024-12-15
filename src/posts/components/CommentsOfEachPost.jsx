import { useParams } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import usePosts from "../hooks/usePosts";
import { useEffect, useState } from "react";
import Joi from "joi";
import useForm from "../../forms/hooks/useForm";
import CustomedInput from "../../forms/components/CustomedInput";
import CustomedForm from "../../forms/components/CustomedForm";

export default function CommentsOfEachPost() {
    const { userDetails } = useAuth();
    const { postId } = useParams();
    const { posts, getAllPosts, updatePostComments } = usePosts();

    const [selectedPost, setSelectedPost] = useState(null);

    const schema = {
        comment: Joi.string().min(1).max(500).required().label('Comment')
    };

    const handleFormSubmit = (formData) => {
        if (selectedPost) {
            const newComment = {
                userName: {
                    first: userDetails?.name?.first,
                    middle: userDetails?.name?.middle || '',
                    last: userDetails?.name?.last,
                },
                comment: formData.comment,
                commentId: new Date().getTime(),
                createdAt: new Date().toISOString(),
            };

            updatePostComments(postId, newComment);
            setData({ comment: '' });
        }
    };

    const { handleChange, handleSubmit, data, errors, setData } = useForm(
        { comment: '' },
        schema,
        handleFormSubmit
    );

    useEffect(() => {
        getAllPosts();
    }, []);

    useEffect(() => {
        if (posts && postId) {
            const foundPost = posts.find((post) => post._id === postId);
            setSelectedPost(foundPost);
        }
    }, [postId, posts]);

    return (
        <div >
            {selectedPost ? (
                <div>
                    <CustomedForm
                        onSubmit={handleSubmit}
                        onClear={() => setData({ comment: '' })}
                        bottomProps={{
                            submitText: "Submit Comment",
                            submitDisabled: !data.comment || errors.comment,
                        }}
                    >
                        <CustomedInput
                            name="comment"
                            placeholder="Write your comment here..."
                            type="text"
                            value={data.comment}
                            onChange={handleChange}
                            error={errors.comment}
                            style={styles.input}
                        />
                        <div style={styles.commentsList}>
                            <h4 style={styles.commentsTitle}>Comments:</h4>
                            {selectedPost.comments && selectedPost.comments.length > 0 ? (
                                <ul style={styles.commentsContainer}>
                                    {selectedPost.comments.map((comment, index) => (
                                        <li key={index} style={styles.commentItem}>
                                            <div style={styles.commentHeader}>
                                                <img
                                                    src={userDetails?.image.path || "/default-avatar.png"}
                                                    alt="User Avatar"
                                                    style={styles.userAvatar}
                                                />
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


                    </CustomedForm>
                </div>
            ) : (
                <p>Post not found.</p>
            )}
        </div>
    );
}

const styles = {
    commentsList: {
        marginTop: '20px',
        width: '100%',
    },
    commentsTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '15px',
    },
    commentsContainer: {
        listStyleType: 'none',
        paddingLeft: '0',
    },
    commentItem: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        maxWidth: '100%',
    },
    commentHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    userAvatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '15px',
        marginTop: '-15px',
    },
    userInfo: {
        flexGrow: '1',
    },
    userName: {
        fontSize: '15px',
        color: '#333',
    },
    commentDate: {
        fontSize: '11px',
        color: '#888',
    },
    commentText: {
        fontSize: '15px',
        color: '#444',
        marginTop: '10px',
        wordWrap: 'break-word',
    },
    input: {
        width: '100%',
        maxWidth: '1300px',
        padding: '12px',
        marginTop: '20px',
        borderRadius: '10px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        fontSize: '16px',
        outline: 'none',
        transition: 'border 0.3s ease, box-shadow 0.3s ease',
        ':focus': {
            borderColor: '#007bff',
            boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
        }
    }
}
