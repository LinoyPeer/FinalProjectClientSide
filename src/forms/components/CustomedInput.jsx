import { Form, Input } from 'antd';
import React from 'react';

export default function CustomedInput({ name, error, placeholder, type, value, onChange, prefix }) {

    return (
        <Form.Item
            name={name}
            validateStatus={error ? 'error' : ''}
            help={error || ''}
        >
            <Input
                name={name}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                prefix={prefix}
            />
        </Form.Item>
    );
}
