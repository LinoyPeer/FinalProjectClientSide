import React, { useState, useEffect } from 'react';
import { Button, Typography, Space, Input, Select } from 'antd';
import { UploadOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import PageHeader from '../../components/pageHeader';
import { useAuth } from '../../providers/AuthProvider';
import TextArea from 'antd/es/input/TextArea';
import useUsers from '../hooks/useUsers';
import { useNotification } from '../../providers/NotificationProvider';
import useForm from '../../forms/hooks/useForm';
import initialEditProfileForm from '../helpers/initialForms/initialEditProfileForm';
import editProfileSchema from '../models/editProfileSchema';

const { Text } = Typography;

export default function ProfileSettings() {
    const { userDetails } = useAuth();
    const [imagePreview, setImagePreview] = useState(null);
    const { handleEditUser } = useUsers();
    const setNotification = useNotification();

    const { handleChange, handleReset, onSubmit, data, errors, setData } = useForm(
        initialEditProfileForm, editProfileSchema, async (formData) => {
            const updatedUserData = new FormData();
            updatedUserData.append('firstName', formData.firstName);
            updatedUserData.append('middleName', formData.middleName);
            updatedUserData.append('lastName', formData.lastName);
            updatedUserData.append('bio', formData.bio);

            if (formData.image) {
                updatedUserData.append('image', formData.image);
            }

            try {
                await handleEditUser(updatedUserData);
                setNotification('green', 'Profile updated successfully');

                setData({
                    firstName: formData.firstName,
                    middleName: formData.middleName,
                    lastName: formData.lastName,
                    bio: formData.bio,
                });
            } catch (error) {
                setNotification('red', 'Error updating profile');
                console.error(error);
            }
        }
    );

    useEffect(() => {
        if (userDetails) {
            setData({
                firstName: userDetails.name?.first || '',
                middleName: userDetails.name?.middle || '',
                lastName: userDetails.name?.last || '',
                bio: userDetails.bio || '', // וודא ש-MISSING BIO לא גורם לבעיה
            });
        }
    }, [userDetails, setData]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            setData((prev) => ({
                ...prev,
                image: file,
            }));
        }
    };

    return (
        <div style={{ padding: '30px' }}>
            <PageHeader title={'Profile Settings'} subtitle={'Edit your profile'} />

            <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong>Change Profile Picture: </Text>
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
                        name="firstName"
                        value={data.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
                </Space>
                <br />
                <Space>
                    <Text style={{ fontWeight: 'normal' }}>Middle: </Text>
                    <TextArea
                        style={{ width: '130px', height: '10px', fontSize: '14px' }}
                        name="middleName"
                        value={data.middleName}
                        onChange={handleChange}
                    />
                    {errors.middleName && <div style={{ color: 'red' }}>{errors.middleName}</div>}
                </Space>
                <br />
                <Space>
                    <Text style={{ fontWeight: 'normal' }}>Last: </Text>
                    <TextArea
                        style={{ width: '130px', height: '10px', fontSize: '14px' }}
                        name="lastName"
                        value={data.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
                </Space>
            </div>

            <div style={{ marginTop: '20px' }}>
                <Text strong>Bio: </Text>
                <div style={{ marginTop: '10px' }}></div>
                <TextArea
                    value={data.bio}
                    name='bio'
                    onChange={(e) => handleChange(e)}
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
                    style={{ width: '100%', marginTop: '10px' }}
                    placeholder="Select your gender"
                    prefix={<UserOutlined />}
                >
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                </Select>
            </div>

            <div style={{ marginTop: '20px' }}>
                <Button type="primary" icon={<EditOutlined />} onClick={onSubmit}>
                    Save Changes
                </Button>
            </div>
            <br />
        </div>
    );
}
