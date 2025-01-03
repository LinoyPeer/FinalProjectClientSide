import React from 'react';
import { Col, Switch } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import LogoIcon from '../logo/LogoIcon';
import NavBarItem from '../../../routes/components/NavBarItem';
import LogoName from '../logo/LogoName';
import { useMediaQuery } from 'react-responsive';
import ROUTES from '../../../routes/routes';

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
                        specificBtnStyle={{
                            border: '1.5px solid #343',
                            backgroundColor: 'lightBlue',
                            color: 'black',
                        }}
                        specificNavStyle={{
                            marginLeft: '2em',
                        }}
                    />
                    <NavBarItem
                        to={ROUTES.FAVORITES}
                        label={'Favorites'}
                        specificBtnStyle={{
                            fontFamily: 'Caveat, cursive',
                            fontSize: '1.3em',
                            backgroundColor: 'lightBlue',
                            color: 'black',
                        }}
                    />
                    <NavBarItem
                        to={ROUTES.CHATS}
                        label={'Communications'}
                        specificBtnStyle={{
                            fontFamily: 'Caveat, cursive',
                            fontSize: '1.3em',
                            backgroundColor: 'lightBlue',
                            color: 'black',
                        }}
                    />
                    <NavBarItem
                        to={ROUTES.PROFILE}
                        label={'Profile'}
                        specificBtnStyle={{
                            fontFamily: 'Caveat, cursive',
                            fontSize: '1.3em',
                            backgroundColor: 'lightBlue',
                            color: 'black',
                        }}
                    />
                </Col>
            )}
        </Col>
    );
}
