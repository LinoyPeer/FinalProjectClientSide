import { MenuOutlined, MoonOutlined, SunOutlined, LogoutOutlined } from '@ant-design/icons';
import { Col, Divider, Modal, Switch, Typography } from 'antd';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from '../../../providers/ThemeProvider';
import { useAuth } from '../../../providers/AuthProvider';
import usePostsActions from '../../../posts/hooks/usePostsActions';
import ROUTES from '../../../routes/routes';

export default function RightNavBar() {
    const { isModalVisible, handleCancelModal, handleMenu, hanndleChooseOption } = usePostsActions();
    const { isDarkMode, toggleTheme } = useTheme();
    const isDesktop = useMediaQuery({ minWidth: 768 });
    const { logout, isLoggedIn, token } = useAuth();
    return (
        <>
            {!isDesktop && (
                <>
                    <Col>
                        <Switch
                            style={{ marginLeft: '6em' }}
                            checked={isDarkMode}
                            onChange={toggleTheme}
                            checkedChildren={<SunOutlined />}
                            unCheckedChildren={<MoonOutlined />}
                        />
                    </Col>
                    {isLoggedIn && (
                        <>
                            <Col onClick={logout}>
                                <LogoutOutlined style={{ marginLeft: '2em', fontWeight: 'bold', fontSize: '15px' }} />
                            </Col>
                            <Col>
                                <MenuOutlined style={{ marginLeft: '2em' }} onClick={handleMenu} />
                                <Modal
                                    title="Menu"
                                    open={isModalVisible}
                                    onCancel={handleCancelModal}
                                    onClose={handleCancelModal}
                                    footer={null}
                                    width={130}
                                    style={{
                                        top: 60,
                                        right: 15,
                                        position: 'fixed',
                                    }}
                                >
                                    <Col style={{ fontSize: '15px', display: 'flex', flexDirection: 'column', color: 'black', marginTop: '-1vh' }}>
                                        <Divider style={{ margin: '8px 0', borderWidth: '3px', fontWeight: 'bold', borderColor: 'grey' }} />
                                        <Typography onClick={() => hanndleChooseOption(ROUTES.ABOUT)} >About</Typography>
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Typography onClick={() => hanndleChooseOption(ROUTES.PROFILE_SETTINGS)} >Settings</Typography>
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Typography onClick={() => hanndleChooseOption(ROUTES.ABOUT)} >Saved</Typography>
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Typography onClick={() => hanndleChooseOption(ROUTES.CONTACT)} >Contact</Typography>
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Typography onClick={logout} >Logout</Typography>
                                    </Col>
                                </Modal>
                            </Col>
                        </>
                    )}
                </>
            )}

            {isDesktop && (
                <>
                </>
            )}
        </>
    );
}
