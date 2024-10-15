import { Layout, Segmented } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';

export default function Footer() {
    const options = ['Home', 'Profile', 'Settings'];
    const { Footer } = Layout;
    return (
        <Footer
            style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                backgroundColor: 'rgba(230, 230, 230, 1)',
                borderRadius: '30px 30px 0 0',
                padding: '10px 0'
            }}
        >
            <Segmented
                options={options}
                style={{ maxWidth: '400px', textAlign: 'center' }}
            />
        </Footer>

    );
}
