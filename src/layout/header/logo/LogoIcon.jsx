import { Avatar, Col } from 'antd'
import React from 'react'
import NavBarLink from '../../../routes/components/NavBarLink'
import ROUTES from '../../../routes/routes'
import { useMediaQuery } from 'react-responsive';

export default function LogoIcon() {
    const isDesktop = useMediaQuery({ minWidth: 768 });

    return (
        <NavBarLink
            to={ROUTES.ROOT}
            style={isDesktop ? { marginLeft: '6em' } : { marginLeft: '2em' }}
        >
            <Col>
                <Avatar size={45} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREzDh3V2ZGpCD7NiBn73Gble1dxHi3o7ZEnw&s' style={{ marginLeft: '-3.5em' }} />
            </Col>
        </NavBarLink>
    )
}
