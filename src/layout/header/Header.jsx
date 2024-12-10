import React from 'react';
import { Avatar, Row, Col, Layout } from 'antd';
import { useTheme } from '../../providers/ThemeProvider';
import { darkTheme, lightTheme } from '../../themes/accessibilityTheme';
import LeftNavBar from './leftNavigation/LeftNavBar';
import RightNavBar from './rightNavigation/RightNavBar';

export default function Header() {
    const { Header } = Layout;
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 2,
                backgroundColor: theme.token.colorHeaderBg,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                // width: '100%',
                overflow: 'hidden'
            }}
        >
            <LeftNavBar />
            <RightNavBar />
        </Header>
    );
}
