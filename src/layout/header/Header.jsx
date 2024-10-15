import { Avatar, Row, Col, Layout } from 'antd';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import NavBarItem from '../../routes/components/NavBarItem';
import { HomeOutlined } from '@ant-design/icons';

export default function Header() {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    const { Header } = Layout;

    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 2,
                backgroundColor: 'rgba(230, 230, 230,1)',
                borderRadius: '0 0 30px 30px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Row align="middle" style={{
                marginLeft: '2em', fontFamily: 'Caveat, cursive'
            }}>
                <Col>
                    <Avatar size={45} />
                </Col>
                <Col>
                    <NavBarItem
                        to={'/posts'}
                        label={<HomeOutlined />}
                        specificBtnStyle={{ border: '1.5px solid #343' }}
                        specificNavStyle={{ marginLeft: '2em' }}
                    />
                    <NavBarItem to={'/favorite'} label={'Favorites'} specificBtnStyle={{ fontFamily: 'Caveat, cursive', fontSize: '1.3em' }} />
                    <NavBarItem to={'/notification'} label={'Notification'} specificBtnStyle={{ fontFamily: 'Caveat, cursive', fontSize: '1.3em' }} />
                    <NavBarItem to={'/Communications'} label={'Communications'} specificBtnStyle={{ fontFamily: 'Caveat, cursive', fontSize: '1.3em' }} />
                </Col>
            </Row>
        </Header>
    );
}
