import React, { createContext, useContext, useState } from 'react';
import { ConfigProvider } from 'antd';
import { darkTheme, lightTheme } from '../themes/accessibilityTheme';

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ConfigProvider theme={theme}>
            <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        </ConfigProvider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a CustomThemeProvider');
    return context;
}
