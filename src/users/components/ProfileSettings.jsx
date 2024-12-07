import React, { useState } from 'react';
import { Input, Button, Typography, Upload, message, Space, Select } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import PageHeader from '../../components/pageHeader';
import { useAuth } from '../../providers/AuthProvider';
import TextArea from 'antd/es/input/TextArea';

const { Title, Text } = Typography;

export default function ProfileSettings() {
    const [bio, setBio] = useState('');
    const [gender, setGender] = useState('');
    const { userDetails } = useAuth();
    // const fullName = `${userDetails.name?.first || 'Unknown'} ${userDetails.name?.middle || ''} ${userDetails.name?.last || ''}`.trim();

    const handleBioChange = (e) => setBio(e.target.value);
    const handleGenderChange = (value) => {
        if (value !== "" && value) {
            setGender(value);
            console.log(gender);
        }
    };
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

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <Text strong>Edit Username: </Text>
                <br />
                <Space>
                    <Typography style={{ fontWeight: 'normal' }}>first: </Typography>
                    <TextArea
                        style={{ width: '130px', height: '10px', fontSize: '14px' }}
                        placeholder={userDetails?.name?.first || 'Unknown'}
                    >
                        {userDetails?.name?.first || 'Unknown'}
                    </TextArea>
                </Space>
                <br />
                <Space>
                    <Text strong>middle: </Text>
                    <TextArea
                        style={{ width: '130px', height: '10px', fontSize: '14px' }}
                        placeholder={userDetails?.name?.middle || 'Unknown'}
                    >
                        {userDetails?.name?.middle || 'Unknown'}
                    </TextArea>
                </Space>
                <br />
                <Space>
                    <Text strong>last: </Text>
                    <TextArea
                        style={{ width: '130px', height: '10px', fontSize: '14px' }}
                        placeholder={userDetails?.name?.last || 'Unknown'}
                    >
                        {userDetails?.name?.last || 'Unknown'}
                    </TextArea>
                </Space>
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
                <Select
                    value={gender}
                    onChange={handleGenderChange}
                    style={{ width: '100%', marginTop: '10px' }}
                    placeholder="Select your gender"
                    prefix={<UserOutlined />}
                >
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                </Select>
            </div>

            <div style={{ marginTop: '20px' }}>
                <Button type="primary" icon={<EditOutlined />}>
                    Save Changes
                </Button>
            </div>
            <br />
        </div>
    );
};
