import React from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';
import NotificationButton from './Components/NotificationButton';
import NotificationList from './Components/NotificationList';
import './App.css';

const App: React.FC = () => {
  /**
   * Adding a new notification when we click 1 of three buttons 
   * Buttons :- Notification 1, Notification 2, Notification 3
   * @param message String Notification name 
   */
  const handleButtonClick = async (message: string) => {
    await addDoc(collection(db, "notifications"), {
      message,
      read: false,
      createdAt: serverTimestamp()
    });
  };

  return (
    <div className='notification-main-wrapper'>
      <h1 className='notification-heading'>Notification System</h1>
      <div className='notification-button-wrapper'>
        <NotificationButton message="Notification 1" onClick={handleButtonClick} />
        <NotificationButton message="Notification 2" onClick={handleButtonClick} />
        <NotificationButton message="Notification 3" onClick={handleButtonClick} />
      </div>
      <NotificationList />
    </div>
  );
};

export default App;
