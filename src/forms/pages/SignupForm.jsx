import React from 'react';
import CustomedForm from '../components/CustomedForm';
import CustomedInput from '../components/CustomedInput';
import { LockOutlined, MailOutlined, PhoneOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import useForm from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routes';
import initialSignupForm from '../../users/helpers/initialForms/initialSignupForm';
import signupSchema from '../../users/models/signupSchema';


export default function SignupForm() {
    const { handleChange, onSubmit, handleReset, data, errors } = useForm(initialSignupForm, signupSchema, (formData) => {
        console.log("Form submitted successfully!", formData);
    });

    const navigate = useNavigate();

    return (
        <CustomedForm
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
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
                name="fullName"
                placeholder="Full Name"
                prefix={<UserOutlined />}
                onChange={handleChange}
                value={data.fullName}
                error={errors.fullName}
            />
            <CustomedInput
                name="username"
                placeholder="Username"
                prefix={<UserAddOutlined />}
                onChange={handleChange}
                value={data.username}
                error={errors.username}
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
        </CustomedForm>
    );
}
