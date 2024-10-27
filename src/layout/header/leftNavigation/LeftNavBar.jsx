import React from 'react';
import { Col, Switch } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import LogoIcon from '../logo/LogoIcon';
import NavBarItem from '../../../routes/components/NavBarItem';
import LogoName from '../logo/LogoName';
import { useMediaQuery } from 'react-responsive';

export default function LeftNavBar() {
    const isDesktop = useMediaQuery({ minWidth: 768 });

    return (
        <Col style={{ display: 'flex', alignItems: 'center' }}>
            <LogoIcon />
            <LogoName />
            {isDesktop && (
                <Col style={{ display: 'inline-flex', marginLeft: '1em' }}>
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
            )}
        </Col>
    );
}
