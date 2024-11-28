import { Divider, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'

export default function PageHeader({ title, subtitle }) {

    return (
        <>
            <Content style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant='h2' component='h1' >{title} </Typography>
                <Typography variant='h5' component='h3'>{subtitle}</Typography>
                <Divider sx={{ my: 2 }} />
            </Content>
        </>
    )
}
