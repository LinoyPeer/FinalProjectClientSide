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

export default function SignupForm() {
    const { handleChange, onSubmit, handleReset, data, errors } = useForm(initialSignupForm, signupSchema, (formData) => {
        console.log("Form submitted successfully!", formData);
    });

    const [file, setFile] = useState(null);
    const { handleSignup } = useUsers();
    const navigate = useNavigate();

    // טיפול בשינוי קובץ
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleFormSubmit = (e) => {

        // קריאה לפונקציית התחברות עם פרטי המשתמש ועם התמונה (אם יש)
        handleSignup(data, file); // שליחה של פרטי המשתמש והקובץ (אם קיים)
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
            {/* שדה בחירת תמונה */}
            <CustomedInput
                name="profileImage"
                type="file"
                onChange={handleFileChange}
                error={errors.profileImage}
            />
        </CustomedForm>
    );
}
