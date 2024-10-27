import React from 'react'
import NavBarLink from '../../../routes/components/NavBarLink'
import { Col } from 'antd'
import ROUTES from '../../../routes/routes'
import Typography from 'antd/es/typography/Typography'

export default function LogoName() {
    return (
        <NavBarLink
            to={ROUTES.ROOT}
            style={{ fontFamily: 'Caveat, cursive' }}
        >
            <Col style={{ fontFamily: "Playwrite GB S, cursive", fontSize: '15px', fontWeight: 'bold', color: 'black' }}>
                Instapost
            </Col>
        </NavBarLink>
    )
}

