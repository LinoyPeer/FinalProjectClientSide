import { Layout } from 'antd'
import React from 'react'

export default function Main({ children }) {
    const { Content } = Layout;

    return (
        <>
            <Content>
                {children}
            </Content>
        </>

    )
}
