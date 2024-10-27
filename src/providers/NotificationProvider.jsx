import React, { createContext, useCallback, useContext, useState } from 'react';
import { App } from 'antd';
import { openNotification } from './helpers/notificationService';

const NotificationBarContext = createContext();

export default function NotificationProvider({ children }) {
    const { notification } = App.useApp();
    const [notificationData, setNotificationData] = useState({
        color: 'red',
        message: 'Notification message',
    });

    const setNotification = useCallback((color, message) => {
        setNotificationData({ color, message });
        openNotification(notification, color, message);
    }, [notification]);

    return (
        <NotificationBarContext.Provider value={setNotification}>
            {children}
        </NotificationBarContext.Provider>
    );
}

export const useNotification = () => {
    const context = useContext(NotificationBarContext);
    if (!context) throw new Error('useNotification must be used within NotificationProvider');
    return context;
};