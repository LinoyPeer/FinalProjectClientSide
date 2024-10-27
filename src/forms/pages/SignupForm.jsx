import React from 'react';
import CustomedForm from '../components/CustomedForm';
import CustomedInput from '../components/CustomedInput';
import { LockOutlined, MailOutlined, PhoneOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import useForm from '../hooks/useForm';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routes';
import { useAuth } from '../../providers/AuthProvider';
import initialSignupForm from '../../users/helpers/initialForms/initialSignupForm';

const schema = {
    fullName: Joi.string().required().label("Full Name"),
    username: Joi.string().min(6).required().label("Username"),
    email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
    phone: Joi.string().required().label("Phone"),
    password: Joi.string().min(2).required().label("Password"),
};

export default function SignupForm() {
    const { login } = useAuth();
    const { handleChange, onSubmit, handleReset, data, errors } = useForm(initialSignupForm, schema, (formData) => {
        console.log("Form submitted successfully!", formData);
        login();
    });

    const navigate = useNavigate();

    return (
        <CustomedForm
            onSubmit={(e) => {
                e.preventDefault(); // מונע רענון של העמוד
                onSubmit();
            }}
            onClear={handleReset}
            bottomProps={{
                checkboxText: "Remember me",
                submitText: "Register",
                linkHrefTextOptinial2: "Log in",
                onLinkClick: () => navigate(ROUTES.LOGIN)
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
