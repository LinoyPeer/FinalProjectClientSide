import { Layout, Row } from 'antd';
import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import { darkTheme, lightTheme } from '../../themes/accessibilityTheme';
import { FileAddFilled, FileAddOutlined, HeartFilled, HeartOutlined, HomeFilled, HomeOutlined, MessageFilled, MessageOutlined, SearchOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRegUser, FaUser, FaUserLarge } from "react-icons/fa6";
import ROUTES from '../../routes/routes';

export default function Footer() {
    const navigate = useNavigate();
    const { Footer } = Layout;
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? darkTheme : lightTheme;
    const location = useLocation();

    const isActive = (route) => location.pathname === route;


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
                {isActive(ROUTES.POSTS) ? (
                    <HomeFilled onClick={() => navigate(ROUTES.POSTS)} />
                ) : (
                    <HomeOutlined onClick={() => navigate(ROUTES.POSTS)} />
                )}

                {isActive(ROUTES.CHATS) ? (
                    <MessageFilled onClick={() => navigate(ROUTES.CHATS)} />
                ) : (
                    <MessageOutlined onClick={() => navigate(ROUTES.CHATS)} />
                )}

                {isActive(ROUTES.UPLOUD_PAGE) ? (
                    <FileAddFilled onClick={() => navigate(ROUTES.UPLOUD_PAGE)} />
                ) : (
                    <FileAddOutlined onClick={() => navigate(ROUTES.UPLOUD_PAGE)} />
                )}

                {isActive(ROUTES.FAVORITES) ? (
                    <HeartFilled onClick={() => navigate(ROUTES.FAVORITES)} />
                ) : (
                    <HeartOutlined onClick={() => navigate(ROUTES.FAVORITES)} />
                )}

                {isActive(ROUTES.PROFILE) ? (
                    <FaUser onClick={() => navigate(ROUTES.PROFILE)} />
                ) : (
                    <FaRegUser onClick={() => navigate(ROUTES.PROFILE)} />
                )}
            </Row>
        </Footer>

    );
}
