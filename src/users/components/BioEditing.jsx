import React, { useState } from 'react';
import { Button, Input, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import usePostsActions from '../../posts/hooks/usePostsActions';

const { Text } = Typography;

export default function BioEditing({ currentBio, onBioChange }) {
    const [bio, setBio] = useState(currentBio);
    const { handleCancelModal } = usePostsActions();

    const handleBioChange = (e) => setBio(e.target.value);

    const handleSaveChanges = () => {
        onBioChange(bio);
        handleCancelModal();
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <Text strong>Bio: </Text>
            <div style={{ marginTop: '10px' }} />
            <Input.TextArea
                value={bio}
                onChange={handleBioChange}
                maxLength={30}
                showCount
                rows={4}
                placeholder="Write something about yourself..."
                style={{ borderRadius: '8px' }}
            />
            <div style={{ marginTop: '40px' }}>
                <Button type="primary" icon={<EditOutlined />} onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
