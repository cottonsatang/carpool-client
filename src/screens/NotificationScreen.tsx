import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNotifications } from '../context/NotificationProvider';

const NotificationScreen = () => {
  const { notifications } = useNotifications(); // 알림 상태 사용

  return (
    <View style={styles.container}>
      <Text style={styles.title}>알림</Text>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noNotifications}>현재 알림이 없습니다.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
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
  noNotifications: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default NotificationScreen;
