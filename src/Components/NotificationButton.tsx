import React from 'react';

type NotificationButtonProps = {
    message: string;
    onClick: (message: string) => void;
};

const NotificationButton: React.FC<NotificationButtonProps> = ({ message, onClick }) => {
    return <button className="notification-add-btn notification-btn" onClick={() => onClick(message)}>{message}</button>;
};

export default NotificationButton;
