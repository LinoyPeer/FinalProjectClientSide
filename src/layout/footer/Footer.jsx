import { Layout, Row } from 'antd';
import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import { darkTheme, lightTheme } from '../../themes/accessibilityTheme';
import { FileAddFilled, FileAddOutlined, HeartFilled, HeartOutlined, HomeFilled, HomeOutlined, InfoCircleFilled, InfoCircleOutlined, MessageFilled, MessageOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRegUser, FaUser } from "react-icons/fa6";
import ROUTES from '../../routes/routes';
import { useAuth } from '../../providers/AuthProvider';
import { IoDocumentLock, IoDocumentLockOutline, IoLogIn, IoLogInOutline } from "react-icons/io5";

export default function Footer() {
    const navigate = useNavigate();
    const { Footer } = Layout;
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? darkTheme : lightTheme;
    const location = useLocation();
    const { isLoggedIn, user } = useAuth();

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
            {isLoggedIn ? (
                <Row
                    style={{ textAlign: 'center', display: 'inline-flex', gap: '3em', fontSize: '19px' }}
                >
                    {user.isBusiness ? (
                        <>
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
                        </>
                    ) : (
                        isActive(ROUTES.ABOUT) ? (
                            <HomeFilled onClick={() => navigate(ROUTES.POSTS)} />
                        ) : (
                            <InfoCircleFilled onClick={() => navigate(ROUTES.ABOUT)} />
                        )
                    )}
                </Row>
            ) : (

                <Row
                    style={{ textAlign: 'center', display: 'inline-flex', gap: '3em', fontSize: '19px' }}
                >
                    {isActive(ROUTES.LOGIN) ? (
                        <IoLogIn onClick={() => navigate(ROUTES.LOGIN)} />
                    ) : (
                        <IoLogInOutline onClick={() => navigate(ROUTES.LOGIN)} />
                    )}
                    {isActive(ROUTES.ABOUT) ? (
                        <InfoCircleFilled onClick={() => navigate(ROUTES.ABOUT)} />
                    ) : (
                        <InfoCircleOutlined onClick={() => navigate(ROUTES.ABOUT)} />
                    )}
                    {isActive(ROUTES.SIGNUP) ? (
                        <IoDocumentLock onClick={() => navigate(ROUTES.SIGNUP)} />
                    ) : (
                        <IoDocumentLockOutline onClick={() => navigate(ROUTES.SIGNUP)} />
                    )}
                </Row>
            )}
        </Footer>
    );
}
