import { useState, useEffect } from 'react';

export const useNotificationManager = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // 앱이 처음 시작할 때 알림 데이터 로드 (여기서는 예시 데이터)
    const loadInitialNotifications = () => {
      const initialNotifications = ['알림 1', '알림 2', '알림 3'];  // 여기서 초기 알림 데이터를 로드
      setNotifications(initialNotifications);
    };

    loadInitialNotifications();
  }, []);

  const addNotification = (notification: string) => {
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    clearNotifications,
  };
};
