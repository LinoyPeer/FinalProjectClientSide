import React, { useState } from 'react';
import { Input, Button, Typography, Upload, message, Space } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import PageHeader from '../../components/pageHeader';

const { Title, Text } = Typography;

export default function ProfileSettings() {
    const [bio, setBio] = useState('');
    const [gender, setGender] = useState('');


    const handleBioChange = (e) => setBio(e.target.value);
    const handleGenderChange = (e) => setGender(e.target.value);

    const handleProfilePictureChange = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    return (
        <div style={{ padding: '30px' }}>
            <PageHeader title={'Profile Settings'} subtitle={'edit your own profile'}></PageHeader>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong>Change Profile Picture</Text>
                <Upload
                    action="/upload"
                    showUploadList={false}
                    onChange={handleProfilePictureChange}
                >
                    <Button icon={<UploadOutlined />}>Upload New Picture</Button>
                </Upload>
            </Space>

            <div style={{ marginTop: '20px' }}>
                <Text strong>Username: </Text>
                <Text>linoy_peer</Text>
            </div>

            <div style={{ marginTop: '20px' }}>
                <Text strong>Bio: </Text>
                <div style={{ marginTop: '10px' }}></div>
                <Input.TextArea
                    value={bio}
                    onChange={handleBioChange}
                    maxLength={30}
                    showCount
                    rows={4}
                    placeholder="Write something about yourself..."
                />
            </div>
            <div style={{ marginTop: '30px' }}>
                <Text strong>Gender: </Text>
                <Text type="secondary">This will not be part of your public profile.</Text>
                <Input
                    value={gender}
                    onChange={handleGenderChange}
                    prefix={<UserOutlined />}
                    placeholder="Enter your gender"
                    style={{ marginTop: '10px' }}
                />
            </div>

            <div style={{ marginTop: '20px' }}>
                <Button type="primary" icon={<EditOutlined />}>
                    Save Changes
                </Button>
            </div>
            <br></br>.
        </div >
    );
};
