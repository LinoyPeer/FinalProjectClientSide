import { ClearOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Typography, Space } from 'antd';
import React from 'react';

const { Link, Text } = Typography;

export default function CustomedBottom({ checkboxText, linkHrefTextOptinial1, submitText, linkHrefTextOptinial2, onLinkClick, onClear, submitDisabled, children }) {
    return (
        <Space direction="vertical" style={{ textAlign: 'center' }}>
            <Form.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    {/* <Checkbox>{checkboxText}</Checkbox> */}
                </Form.Item>
                {/* <Button type="text" icon={<ClearOutlined />} onClick={onClear} /> */}
                <Link href="#">{linkHrefTextOptinial1}</Link>
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType="submit" disabled={submitDisabled}>
                    {submitText}
                </Button>
                <Text>{children || 'or '}</Text>
                <Link onClick={onLinkClick}>
                    {linkHrefTextOptinial2}
                </Link>
            </Form.Item>
        </Space>
    );
}
