import React, { useState } from 'react';
import CustomedForm from '../components/CustomedForm';
import CustomedInput from '../components/CustomedInput';
import { LockOutlined, MailOutlined, PhoneOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import useForm from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routes';
import signupSchema from '../../users/models/signupSchema';
import initialSignupForm from '../../users/helpers/initialForms/initialSignupForm';
import useUsers from '../../users/hooks/useUsers';
import { Checkbox } from 'antd';

export default function SignupForm() {
    const { handleChange, onSubmit, handleReset, data, errors } = useForm(initialSignupForm, signupSchema, (formData) => {
        console.log("Form submitted successfully!", formData);
    });

    const [file, setFile] = useState(null);
    const { handleSignup } = useUsers();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleFormSubmit = async (e) => {
        const user = await handleSignup(data, file);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user)); // 
            navigate(ROUTES.LOGIN);
        }
    };

    return (
        <CustomedForm
            onSubmit={handleFormSubmit}
            onClear={handleReset}
            bottomProps={{
                checkboxText: "Remember me",
                submitText: "Register",
                linkHrefTextOptinial2: "Log in",
                onLinkClick: () => navigate(ROUTES.LOGIN),
                submitDisabled: Object.keys(errors).length > 0
            }}
        >
            <CustomedInput
                name="first"
                placeholder="first Name"
                prefix={<UserOutlined />}
                onChange={handleChange}
                value={data.first}
                error={errors.first}
            />
            <CustomedInput
                name="middle"
                placeholder="Middle Name"
                prefix={<UserOutlined />}
                onChange={handleChange}
                value={data.middle}
                error={errors.middle}
            />
            <CustomedInput
                name="last"
                placeholder="Last Name"
                prefix={<UserOutlined />}
                onChange={handleChange}
                value={data.last}
                error={errors.last}
            />
            <CustomedInput
                name="email"
                placeholder="Email"
                prefix={<MailOutlined />}
                onChange={handleChange}
                value={data.email}
                error={errors.email}
            />
            <CustomedInput
                name="phone"
                placeholder="Phone"
                prefix={<PhoneOutlined />}
                onChange={handleChange}
                value={data.phone}
                error={errors.phone}
            />
            <CustomedInput
                name="password"
                type="password"
                placeholder="Password"
                prefix={<LockOutlined />}
                onChange={handleChange}
                value={data.password}
                error={errors.password}
            />
            <CustomedInput
                name="profileImage"
                type="file"
                onChange={handleFileChange}
                error={errors.profileImage}
            />
            <Checkbox
                name="isBusiness"
                onChange={handleChange}
                checked={data.isBusiness || false}
            >
                Register as Business
            </Checkbox>
        </CustomedForm>
    );
}
