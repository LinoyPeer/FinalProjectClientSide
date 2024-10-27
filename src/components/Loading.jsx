import { Loading3QuartersOutlined } from '@ant-design/icons'
import React from 'react'

export default function Loading({ size = 40, color = 'red' }) {
    return (
        <>
            <Loading3QuartersOutlined
                size={size}
                color={color}
            />
        </>
    )
}
