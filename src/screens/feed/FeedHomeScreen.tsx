import React from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, Pressable, ScrollView } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

function FeedHomeScreen() {
  const navigation = useNavigation();
  const reviewData = [
    { label: '최고', count: 30 },
    { label: '좋음', count: 1000 },
    { label: '보통', count: 10 },
    { label: '별로', count: 4 },
    { label: '나쁨', count: 6 },
  ];

  const userReviews = [
    { userId: 'user123', rating: 5, comment: '정말 좋았습니다!' },
    { userId: 'user456', rating: 4, comment: '괜찮아요.' },
    { userId: 'user789', rating: 3, comment: '보통입니다.' },
    { userId: 'user101', rating: 2, comment: '별로였습니다.' },
    { userId: 'user102', rating: 1, comment: '다시는 이용하지 않을 거예요.' },
  ];

  const totalReviews = reviewData.reduce((total, item) => total + item.count, 0);
  const averageRating = (reviewData.reduce((sum, item, index) => sum + (5 - index) * item.count, 0) / totalReviews).toFixed(1);

  const renderReviewItem = ({ item }: any) => {
    const percentage = ((item.count / totalReviews) * 100).toFixed(1);
    return (
      <View style={styles.reviewRow}>
        <Text style={styles.reviewLabel}>{item.label}</Text>
        <View style={styles.reviewBarBackground}>
          <View style={[styles.reviewBar, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.reviewPercentage}>{percentage}%</Text>
      </View>
    );
  };

  const renderUserReviewItem = ({ item }: any) => {
    return (
      <View style={styles.userReviewRow}>
        <Text style={styles.userId}>{item.userId}</Text>
        <View style={styles.userRating}>
          {[...Array(item.rating)].map((_, index) => (
            <MaterialIcons key={index} name="star" size={16} color="#FFD700" />
          ))}
          {[...Array(5 - item.rating)].map((_, index) => (
            <MaterialIcons key={`empty-${index}`} name="star-border" size={16} color="#FFD700" />
          ))}
        </View>
        <Text style={styles.userComment}>{item.comment}</Text>
      </View>
    );
  };

  const renderStars = () => {
    const fullStars = Math.floor(Number(averageRating));
    const halfStar = Number(averageRating) % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <View style={styles.starContainer}>
        {[...Array(fullStars)].map((_, index) => (
          <MaterialIcons key={`full-${index}`} name="star" size={24} color="#FFD700" />
        ))}
        {halfStar && <MaterialIcons name="star-half" size={24} color="#FFD700" />}
        {[...Array(emptyStars)].map((_, index) => (
          <MaterialIcons key={`empty-${index}`} name="star-border" size={24} color="#FFD700" />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text style={styles.headerTitle}>리뷰</Text>
        </View>
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewTitle}>사용자 리뷰</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingValue}>{averageRating}</Text>
            {renderStars()}
            <Text style={styles.reviewCount}>리뷰 {totalReviews}개</Text>
          </View>
          <FlatList
            data={reviewData}
            renderItem={renderReviewItem}
            keyExtractor={(item) => item.label}
            style={styles.reviewList}
          />
          <FlatList
            data={userReviews}
            renderItem={renderUserReviewItem}
            keyExtractor={(item) => item.userId}
            style={styles.userReviewList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
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
  reviewContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingValue: {
    fontSize: 32,
    fontWeight: "bold",
    marginRight: 8,
  },
  starContainer: {
    flexDirection: "row",
  },
  reviewCount: {
    marginLeft: 8,
    fontSize: 14,
    color: "#888",
  },
  reviewList: {
    marginTop: 16,
  },
  reviewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewLabel: {
    flex: 1,
    fontSize: 14,
  },
  reviewBarBackground: {
    flex: 3,
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginHorizontal: 8,
  },
  reviewBar: {
    height: 10,
    backgroundColor: "#3b82f6",
    borderRadius: 5,
  },
  reviewPercentage: {
    fontSize: 14,
    color: "#888",
  },
  userReviewList: {
    marginTop: 16,
  },
  userReviewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  userId: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  userRating: {
    flexDirection: "row",
    marginRight: 8,
  },
  userComment: {
    flex: 3,
    fontSize: 14,
    color: "#555",
  },
});

export default FeedHomeScreen;
