import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PointsHistoryScreen = () => {
  const navigation = useNavigation();
  const pointsHistory = []; // 현재 포인트 내역이 없으면 빈 배열로 설정

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>포인트 내역</Text>
      </View>

      {pointsHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyText}>포인트 내역이 없습니다.</Text>
        </View>
      ) : (
        <FlatList
          data={pointsHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text>{item}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#000',
  },
  historyItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default PointsHistoryScreen;
