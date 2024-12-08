import React, { useState, useEffect } from 'react';
import { Input, Button, Typography, Space } from 'antd';
import { UploadOutlined, EditOutlined } from '@ant-design/icons';
import PageHeader from '../../components/pageHeader';
import { useAuth } from '../../providers/AuthProvider';
import TextArea from 'antd/es/input/TextArea';
import useUsers from '../hooks/useUsers';
import { useNotification } from '../../providers/NotificationProvider';  // Import the notification hook

const { Text } = Typography;

export default function ProfileSettings() {
    const [userData, setUserData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);
    const { userDetails } = useAuth();
    const { handleEditUser } = useUsers();
    const setNotification = useNotification(); // Get the notification function

    useEffect(() => {
        if (userDetails) {
            setUserData({
                firstName: userDetails.name?.first || '',
                middleName: userDetails.name?.middle || '',
                lastName: userDetails.name?.last || '',
            });
        }
    }, [userDetails]);

    const handleInputChange = (e, field) => {
        setUserData({
            ...userData,
            [field]: e.target.value,
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            setUserData({
                ...userData,
                image: file,
            });
        }
    };

    const handleSaveChanges = async () => {
        const updatedUserData = new FormData();
        updatedUserData.append('firstName', userData.firstName);
        updatedUserData.append('middleName', userData.middleName);
        updatedUserData.append('lastName', userData.lastName);

        if (userData.image) {
            updatedUserData.append('image', userData.image);
        }

        try {
            await handleEditUser(updatedUserData);
            setNotification('green', 'Profile updated successfully');
        } catch (error) {
            setNotification('red', 'Error updating profile');
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '30px' }}>
            <PageHeader title={'Profile Settings'} subtitle={'Edit your profile'} />

            <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong>Change Profile Picture</Text>
                <input
                    onChange={handleFileChange}
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    style={{ display: 'none' }}
                />
                <Button icon={<UploadOutlined />} onClick={() => document.getElementById('image-upload').click()}>
                    Upload New Picture
                </Button>

                {imagePreview && (
                    <div style={{ marginTop: '10px' }}>
                        <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px' }} />
                    </div>
                )}
            </Space>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <Text strong>Edit Username: </Text>
                <br />
                <Space>
                    <Typography style={{ fontWeight: 'normal' }}>First: </Typography>
                    <TextArea
                        style={{ width: '130px', height: '10px', fontSize: '14px' }}
                        value={userData.firstName}
                        onChange={(e) => handleInputChange(e, 'firstName')}
                    />
                </Space>
                <br />
                <Space>
                    <Text strong>Middle: </Text>
                    <TextArea
                        style={{ width: '130px', height: '10px', fontSize: '14px' }}
                        value={userData.middleName}
                        onChange={(e) => handleInputChange(e, 'middleName')}
                    />
                </Space>
                <br />
                <Space>
                    <Text strong>Last: </Text>
                    <TextArea
                        style={{ width: '130px', height: '10px', fontSize: '14px' }}
                        value={userData.lastName}
                        onChange={(e) => handleInputChange(e, 'lastName')}
                    />
                </Space>
            </div>

            <div style={{ marginTop: '20px' }}>
                <Button type="primary" icon={<EditOutlined />} onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </div>
            <br />
        </div>
    );
}
