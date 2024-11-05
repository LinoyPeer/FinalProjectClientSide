import { CommentOutlined, LikeFilled, LikeOutlined, SaveOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Space } from "antd";

export default function PostFooterComponent({ postId, handleLike, handleComment, isLiked }) {
    return (
        <Space size="large" style={{ justifyContent: 'center', display: 'flex', gap: '4em' }}>
            {isLiked ? (
                <LikeFilled
                    style={{ fontSize: '1.3em', color: '#1890ff' }}
                    onClick={() => handleLike(postId)}
                />
            ) : (
                <LikeOutlined
                    style={{ fontSize: '1.3em' }}
                    onClick={() => handleLike(postId)}
                />
            )}
            <CommentOutlined style={{ fontSize: '1.3em' }} onClick={() => handleComment(postId)} />
            <ShareAltOutlined style={{ fontSize: '1.3em' }} />
            <SaveOutlined style={{ fontSize: '1.3em' }} />
        </Space>
    );
}
