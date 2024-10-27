import { MenuOutlined, MoonOutlined, SunOutlined, LogoutOutlined } from '@ant-design/icons'
import { Col, Switch } from 'antd'
import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { useTheme } from '../../../providers/ThemeProvider';
import { useAuth } from '../../../providers/AuthProvider';


export default function RightNavBar() {
    const { isDarkMode, toggleTheme } = useTheme();
    const isDesktop = useMediaQuery({ minWidth: 768 });
    const { logout, isLoggedIn } = useAuth();

    return (
        <>
            {!isDesktop ? (
                <>
                    <Col >
                        <Switch
                            style={{ marginLeft: '6em' }}
                            checked={isDarkMode}
                            onChange={toggleTheme}
                            checkedChildren={<SunOutlined />}
                            unCheckedChildren={<MoonOutlined />}
                        />
                    </Col>
                    {isLoggedIn && (
                        <Col onClick={logout}>
                            <LogoutOutlined style={{ marginLeft: '2em', fontWeight: 'bold', fontSize: '15px' }} />
                        </Col>
                    )}
                    <Col>
                        <MenuOutlined style={{ marginLeft: '2em' }} />
                    </Col>
                </>
            ) : null}
        </>
    );

}
