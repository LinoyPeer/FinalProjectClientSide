import { Layout } from 'antd'
import React from 'react'
import { darkTheme, lightTheme } from '../../themes/accessibilityTheme';
import { useTheme } from '../../providers/ThemeProvider';

export default function Main({ children }) {
    const { Content } = Layout;
    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <>
            <Content style={{ backgroundColor: theme.token.colorMainBg }}>
                {children}
            </Content>
        </>

    )
}
