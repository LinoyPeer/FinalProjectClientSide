
export const openNotification = (notification, color, message) => {
    notification.open({
        message: 'New Notification',
        description: message,
        style: { backgroundColor: color, color: '#fff' },
        duration: 2,
    });
};
