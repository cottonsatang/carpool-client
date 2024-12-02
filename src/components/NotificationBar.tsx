import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNotifications } from '../context/NotificationProvider'; // 알림을 가져오는 훅

const NotificationBar = () => {
  const { notifications } = useNotifications(); // 알림 메시지 가져오기
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (notifications.length > 0) {
      setMessage(notifications[notifications.length - 1]); // 최근 알림 메시지 가져오기
      setVisible(true); // 알림 표시
      const timeout = setTimeout(() => {
        setVisible(false); // 2초 후 알림 숨기기
      }, 2000);

      return () => clearTimeout(timeout); // 컴포넌트 언마운트 시 타이머 클리어
    }
  }, [notifications]);

  if (!visible) return null; // visible이 false일 경우 알림을 화면에 표시하지 않음

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40, // 화면 상단에 위치
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // 배경색을 조금 더 진하게
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // 다른 컴포넌트 위에 표시
    borderRadius: 8, // 둥근 모서리 추가
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  message: {
    color: 'white',
    fontSize: 18, // 글자 크기를 키워서 강조
    fontWeight: 'bold', // 볼드체
    textAlign: 'center',
    textTransform: 'uppercase', // 대문자 처리
  },
});

export default NotificationBar;
