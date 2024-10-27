import { StopOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import React from 'react'

export default function Error({ errorMeassage, size = 50 }) {
    return (
        <>
            <Typography>OOPS! somthing went wrong: {errorMeassage}</Typography>
            <StopOutlined
                size={size}
                errorMessage={errorMeassage} />
        </>
    )
}
