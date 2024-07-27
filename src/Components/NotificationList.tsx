import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from './../firebaseConfig';

type Notification = {
    id: string;
    message: string;
    read: boolean;
    timestamp?: { seconds: number, nanoseconds: number };
};

const NotificationList: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loader, setLoader] = useState<boolean>(true);

    /**
     * Handle this for mark as read notification
     * @param id Notionfication id
     */
    const markAsRead = async (id: string) => {
        const notificationDoc = doc(db, "notifications", id);
        await updateDoc(notificationDoc, { read: true });
    };

    useEffect(() => {
        const notificationsCollection = collection(db, "notifications");
        const notificationsQuery = query(notificationsCollection, orderBy('createdAt', 'desc'));
        /**
         * Geting the notification list real time when adding a new notification 
         */
        const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
            const fetchedNotifications: Notification[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Notification[];
            console.log(fetchedNotifications, "fetchedNotifications");

            setNotifications(fetchedNotifications);
            setLoader(false)
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    return (
        <div className='notifiction-list-wrapper'>
            <h2 className='notifiction-list-heading'>Notifications List</h2>
            <ul className='notifiction-list'>
                {!loader && notifications.map((notification) => (
                    <li
                        className='notifiction-list-item'
                        key={notification.id}
                        style={{ textDecoration: notification.read ? 'line-through' : 'none' }}
                    >
                        {notification.message}
                        {!notification.read && (
                            <button className='notifiction-read-btn' onClick={() => markAsRead(notification.id)}>Mark as Read</button>
                        )}
                    </li>
                ))}
                {!notifications.length && !loader ? <div>Data not found</div> : ""}
                {loader ? <div>Loading...</div> : ""}
            </ul>
        </div>
    );
};

export default NotificationList;
