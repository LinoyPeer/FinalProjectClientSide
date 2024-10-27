import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Typography } from 'antd';
import Joi from 'joi';
import React from 'react';
import useForm from './useForm';
import CustomedInput from '../components/CustomedInput';
import CustomedBottom from '../components/CustomedBottom';

const initialData = {
    username: "",
    password: "",
};

const schema = {
    username: Joi.string().min(6).required().label("Username"),
    password: Joi.string().min(2).required().label("Password"),
};

export default function FormExample({ children }) {
    const { handleChange, onSubmit, handleReset, data, errors } = useForm(initialData, schema, () => {
        console.log("Form submitted successfully!");
    });

    return (
        <Card
            style={{
                background: 'linear-gradient(to bottom, #A7C6ED, #E0E7EF, #D9D9D9)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Typography style={{ fontFamily: 'Caveat, cursive', fontSize: '4em', marginBottom: '1em' }}>
                InstaPost
            </Typography>
            <Form
                name="login"
                initialValues={{ remember: true }}
                style={{
                    maxWidth: 360,
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onFinish={onSubmit}
            >


                <CustomedInput
                    name="username"
                    placeholder="Username"
                    type="text"
                    value={data.username}
                    onChange={handleChange}
                    error={errors.username}
                    prefix={<UserOutlined />}
                />
                {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}

                <CustomedInput
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                    prefix={<LockOutlined />}
                />
                {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                <CustomedBottom
                    checkboxText="Remember me"
                    linkHrefTextOptinial1="Forgoyyyt password"
                    submitText="Log in"
                    linkHrefTextOptinial2="Register now!"
                    onClear={handleReset}
                >
                    {children}
                </CustomedBottom>
            </Form>
        </Card>
    );
}
