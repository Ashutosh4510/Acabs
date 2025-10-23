import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [permission, setPermission] = useState('default');
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('acabs-notification-settings');
    return saved ? JSON.parse(saved) : {
      rideStatus: true,
      promotions: true,
      driverArrival: true,
      general: true
    };
  });

  useEffect(() => {
    localStorage.setItem('acabs-notification-settings', JSON.stringify(settings));
  }, [settings]);

  // Request notification permission
  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    }
    return 'denied';
  };

  // Check permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // Register service worker for background notifications
  useEffect(() => {
    if ('serviceWorker' in navigator && 'Notification' in window) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered for notifications');
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  // Show browser notification
  const showNotification = (title, options = {}) => {
    if (permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/logo192.png',
        badge: '/logo192.png',
        ...options
      });

      // Auto close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      return notification;
    }
  };

  // Add notification to internal state
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show browser notification if enabled
    if (settings[notification.type] !== false) {
      showNotification(notification.title, {
        body: notification.message,
        tag: notification.type
      });
    }
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Update notification settings
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Simulate ride status notifications (for demo)
  const simulateRideNotification = (rideId, status) => {
    const messages = {
      confirmed: {
        title: 'Ride Confirmed',
        message: `Your ride ${rideId} has been confirmed. Driver is on the way.`,
        type: 'rideStatus'
      },
      arrived: {
        title: 'Driver Arrived',
        message: `Your driver has arrived at the pickup location for ride ${rideId}.`,
        type: 'driverArrival'
      },
      completed: {
        title: 'Ride Completed',
        message: `Your ride ${rideId} has been completed successfully.`,
        type: 'rideStatus'
      }
    };

    if (messages[status]) {
      addNotification(messages[status]);
    }
  };

  // Simulate promotional notifications
  const simulatePromotion = () => {
    addNotification({
      title: 'Special Offer!',
      message: 'Get 20% off your next ride with code SAVE20',
      type: 'promotions'
    });
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      permission,
      settings,
      requestPermission,
      addNotification,
      markAsRead,
      clearNotifications,
      updateSettings,
      simulateRideNotification,
      simulatePromotion,
      showNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
