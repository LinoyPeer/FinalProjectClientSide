import React, { useState, useEffect } from 'react';
import { Input, Button, Typography, Upload, message, Space, Select } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import PageHeader from '../../components/pageHeader';
import { useAuth } from '../../providers/AuthProvider';
import TextArea from 'antd/es/input/TextArea';
import useUsers from '../hooks/useUsers';

const { Title, Text } = Typography;

export default function ProfileSettings() {
    const [userData, setUserData] = useState({});
    const { userDetails } = useAuth();
    const { handleEditUser } = useUsers();

    useEffect(() => {
        if (userDetails) {
            // בעת קבלת פרטי המשתמש, נשמור את המידע ב-state אחד
            setUserData({
                firstName: userDetails.name?.first || '',
                middleName: userDetails.name?.middle || '',
                lastName: userDetails.name?.last || '',
                bio: userDetails.bio || '',
                gender: userDetails.gender || '',
            });
        }
    }, [userDetails]);

    const handleInputChange = (e, field) => {
        setUserData({
            ...userData,
            [field]: e.target.value,
        });
    };

    const handleSelectChange = (value, field) => {
        setUserData({
            ...userData,
            [field]: value,
        });
    };

    const handleProfilePictureChange = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const handleSaveChanges = () => {
        // הפונקציה תשלח את כל המידע המעודכן דרך ה-API
        const updatedUserData = {
            name: {
                first: userData.firstName,
                middle: userData.middleName,
                last: userData.lastName,
            },
            bio: userData.bio,
            gender: userData.gender,
        };
        handleEditUser(updatedUserData); // קריאה לפונקציה של עדכון המשתמש
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
                        value={userData.firstName}
                        onChange={(e) => handleInputChange(e, 'firstName')}
                    />
                </Space>
                <br />
                <Space>
                    <Text strong>middle: </Text>
                    <TextArea
                        style={{ width: '130px', height: '10px', fontSize: '14px' }}
                        value={userData.middleName}
                        onChange={(e) => handleInputChange(e, 'middleName')}
                    />
                </Space>
                <br />
                <Space>
                    <Text strong>last: </Text>
                    <TextArea
                        style={{ width: '130px', height: '10px', fontSize: '14px' }}
                        value={userData.lastName}
                        onChange={(e) => handleInputChange(e, 'lastName')}
                    />
                </Space>
            </div>

            <div style={{ marginTop: '20px' }}>
                <Text strong>Bio: </Text>
                <div style={{ marginTop: '10px' }}></div>
                <Input.TextArea
                    value={userData.bio}
                    onChange={(e) => handleInputChange(e, 'bio')}
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
                    value={userData.gender}
                    onChange={(value) => handleSelectChange(value, 'gender')}
                    style={{ width: '100%', marginTop: '10px' }}
                    placeholder="Select your gender"
                    prefix={<UserOutlined />}
                >
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                </Select>
            </div>

            <div style={{ marginTop: '20px' }}>
                <Button type="primary" icon={<EditOutlined />} onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </div>
            <br />
        </div>
    );
};
