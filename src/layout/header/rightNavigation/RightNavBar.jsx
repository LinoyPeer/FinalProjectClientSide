import { MenuOutlined, MoonOutlined, SunOutlined, LogoutOutlined } from '@ant-design/icons'
import { Col, Modal, Switch, Typography } from 'antd'
import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { useTheme } from '../../../providers/ThemeProvider';
import { useAuth } from '../../../providers/AuthProvider';
import usePostsActions from '../../../posts/hooks/usePostsActions';
import AboutPage from '../../../pages/AboutPage';
import ROUTES from '../../../routes/routes';
import { useNavigate } from 'react-router-dom';


export default function RightNavBar() {
    const { isModalVisible, handleCancelModal, handleMenu, hanndleChooseOption } = usePostsActions();
    const { isDarkMode, toggleTheme } = useTheme();
    const isDesktop = useMediaQuery({ minWidth: 768 });
    const { logout, isLoggedIn } = useAuth();
    const navigate = useNavigate();

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
                        <MenuOutlined style={{ marginLeft: '2em' }} onClick={handleMenu} />
                        <Modal
                            title="Menu"
                            open={isModalVisible}
                            onCancel={handleCancelModal}
                            onClose={handleCancelModal}
                            footer={null}
                            width={150}

                            style={{
                                top: 60,
                                right: 15,
                                position: 'fixed',
                            }}
                        >
                            <Col style={{ fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '1em', marginTop: '2vh' }}>
                                <Typography onClick={() => hanndleChooseOption(ROUTES.ABOUT)} >About</Typography>
                                <Typography onClick={() => hanndleChooseOption(ROUTES.POSTS)} >Settings</Typography>
                                <Typography onClick={() => hanndleChooseOption(ROUTES.ABOUT)} >Saved</Typography>
                                <Typography onClick={() => hanndleChooseOption(ROUTES.COMMUNICATION)} >communication</Typography>
                                <Typography onClick={() => hanndleChooseOption(ROUTES.CONTACT)} >Contact</Typography>
                                <Typography onClick={() => hanndleChooseOption(ROUTES.LOGIN)} >Logout</Typography>
                            </Col>
                        </Modal>
                    </Col>
                </>
            ) : null}
        </>
    );

}
