import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";

function UsageHistoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.emptyContainer}>
        {/* 이미지 추가 */}
        <Image
          source={require('../../asset/user-history.png')}
          style={styles.emptyImage}
          resizeMode="contain"
        />
        <Text style={styles.emptyText}>이용 내역이 없습니다.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
  },
  emptyImage: {
    width: 150, // 이미지의 너비를 지정
    height: 150, // 이미지의 높이를 지정
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});

export default UsageHistoryScreen;
