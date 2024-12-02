import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';

type AlarmListProps = {
  visible: boolean;  // 알람 모달을 열고 닫는 상태
  onClose: () => void;  // 모달 닫는 함수
  alarms: string[];  // 알림 리스트
};

const NotificationList: React.FC<AlarmListProps> = ({ visible, onClose, alarms }) => {

  const [notificationList, setNotificationList] = useState<string[]>([]);

  // 알림이 처음 화면에 들어왔을 때 초기화하는 useEffect
  useEffect(() => {
    // 예시로 초기 알림 데이터를 설정하는 방법
    setNotificationList(alarms);  // 또는 서버에서 알림을 받아오는 로직을 여기에 추가
  }, [alarms]);

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>알림</Text>
          {notificationList.length > 0 ? (
            <FlatList
              data={notificationList}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text style={styles.noAlarms}>현재 알림이 없습니다.</Text>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  noAlarms: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NotificationList;
