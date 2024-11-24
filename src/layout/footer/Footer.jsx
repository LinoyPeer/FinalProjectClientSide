import { Layout, Row } from 'antd';
import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import { darkTheme, lightTheme } from '../../themes/accessibilityTheme';
import { FileAddOutlined, HeartOutlined, HomeOutlined, MessageOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routes';

export default function Footer() {
    const navigate = useNavigate();

    const { Footer } = Layout;
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? darkTheme : lightTheme;
    return (
        <Footer
            style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                padding: '17px 0',
                backgroundColor: theme.token.colorFooterBg,
            }}
        >
            <Row
                style={{ textAlign: 'center', display: 'inline-flex', gap: '3em', fontSize: '19px' }}
            >
                <HomeOutlined onClick={() => navigate(ROUTES.POSTS)} />
                <MessageOutlined onClick={() => navigate(ROUTES.CHATS)} />
                <FileAddOutlined onClick={() => navigate(ROUTES.UPLOUD_PAGE)} />
                <HeartOutlined onClick={() => {
                    navigate(ROUTES.FAVORITES)
                }} />
                <UserOutlined onClick={() => {
                    navigate(ROUTES.PROFILE)
                }} />
            </Row>
        </Footer>

    );
}
