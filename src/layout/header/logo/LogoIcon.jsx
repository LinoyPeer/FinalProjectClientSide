import { Avatar, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import NavBarLink from '../../../routes/components/NavBarLink';
import ROUTES from '../../../routes/routes';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from '../../../providers/AuthProvider';
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';

export default function LogoIcon() {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    const { userDetails } = useAuth();

    const avatarUrl = userDetails?.image?.path || <UserOutlined />;

    return (
        <NavBarLink
            to={ROUTES.POSTS}
            style={isDesktop ? { marginLeft: '6em' } : { marginLeft: '2em' }}
        >
            <Col>
                <Avatar
                    size={45}
                    src={avatarUrl}
                    style={{ marginLeft: '-3.5em' }}
                />
            </Col>
        </NavBarLink>
    );
}
