import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert } from 'react-native';

// 알림 상태 관리
interface NotificationContextType {
  notifications: string[];
  addNotification: (message: string) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<string[]>([]);

  // 알림 추가 함수
  const addNotification = (message: string) => {
    const customMessage = message === '로그인했습니다'
      ? '로그인 성공! 다시 돌아오신 걸 환영합니다!'
      : message;
    setNotifications((prev) => [...prev, customMessage]);
    Alert.alert('새로운 알림', message);
  };

  // 알림 모두 삭제 함수
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

// useNotifications 훅
export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
