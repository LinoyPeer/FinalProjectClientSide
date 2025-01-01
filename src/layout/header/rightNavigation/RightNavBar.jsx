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
    const { logout, isLoggedIn, token, user } = useAuth();

    const renderMenuOptions = () => {
        return (
            <>
                <Col style={{ fontSize: '15px', display: 'flex', flexDirection: 'column', color: 'black' }}>
                    <Divider style={{ margin: '8px 0', borderWidth: '3px', fontWeight: 'bold', borderColor: 'grey' }} />
                    {/* עבור משתמשים עסקיים ואדמינים */}
                    {(user.isBusiness || user.isAdmin) && (
                        <>
                            <Typography onClick={() => hanndleChooseOption(ROUTES.ABOUT)}>About</Typography>
                            <Divider style={{ margin: '8px 0' }} />
                            <Typography onClick={() => hanndleChooseOption(ROUTES.PROFILE_SETTINGS)}>Settings</Typography>
                            <Divider style={{ margin: '8px 0' }} />
                            <Typography onClick={logout}>Logout</Typography>
                        </>
                    )}
                    {/* עבור אדמינים בלבד */}
                    {user.isAdmin && (
                        <>
                            <Typography onClick={() => hanndleChooseOption(ROUTES.ABOUT)}>About</Typography>
                            <Divider style={{ margin: '8px 0' }} />
                            <Typography onClick={() => hanndleChooseOption(ROUTES.PROFILE_SETTINGS)}>Settings</Typography>
                            <Divider style={{ margin: '8px 0' }} />
                            <Typography onClick={logout}>Logout</Typography>
                        </>
                    )}
                    {/* עבור משתמשים לא עסקיים ולא אדמינים */}
                    {!user.isBusiness && !user.isAdmin && (
                        <>
                            <Typography onClick={() => hanndleChooseOption(ROUTES.POSTS)}>Posts</Typography>
                            <Divider style={{ margin: '8px 0' }} />
                            <Typography onClick={() => hanndleChooseOption(ROUTES.ABOUT)}>About</Typography>
                            <Divider style={{ margin: '8px 0' }} />
                            <Typography onClick={logout}>Logout</Typography>
                        </>
                    )}
                </Col>
            </>
        );
    };

    return (
        <>
            {/* עבור מצב מובייל */}
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
                                    {renderMenuOptions()}
                                </Modal>
                            </Col>
                        </>
                    )}
                </>
            )}

            {/* עבור מצב דסקטופ */}
            {isDesktop && (
                <>
                    <Col
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '200px', // מיקום המתג ביחס לאייקונים
                            transform: 'translateY(-50%)',
                        }}
                    >
                        <Switch
                            checked={isDarkMode}
                            onChange={toggleTheme}
                            checkedChildren={<SunOutlined />}
                            unCheckedChildren={<MoonOutlined />}
                        />
                    </Col>
                    {isLoggedIn && (
                        <>
                            {/* האייקונים בצד ימין */}
                            <Col
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '100px', // הזזתי שמאלה
                                    transform: 'translateY(-50%)',
                                }}
                                onClick={logout}
                            >
                                <LogoutOutlined style={{ fontWeight: 'bold', fontSize: '15px' }} />
                            </Col>
                            <Col
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '140px', // הזזתי שמאלה
                                    transform: 'translateY(-50%)',
                                }}
                            >
                                <MenuOutlined onClick={handleMenu} />
                            </Col>
                            {/* תצוגת התפריט בצד ימין */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '60px',
                                    right: '10px',
                                    background: '#fff',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    padding: '10px',
                                    borderRadius: '8px',
                                }}
                            >
                                {renderMenuOptions()}
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
}
