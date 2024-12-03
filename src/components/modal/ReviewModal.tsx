import React, { useState, useEffect } from 'react'; // useEffect를 react에서 가져오기
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ReviewModalProps {
  visible: boolean;
  onClose: () => void;
  showProfile?: boolean;
}

function ReviewModal({ visible, onClose, showProfile }: ReviewModalProps) {
  const [rating, setRating] = useState<number>(0);

  const handleRatingPress = (star: number) => {
    setRating(star);
  };

  // 뒤로 가기 버튼 비활성화
  useEffect(() => {
    if (visible) {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        // 뒤로 가기 버튼을 막음
        return true;
      });
      return () => backHandler.remove();
    }
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        // 뒤로 가기 버튼을 눌렀을 때 동작하지 않도록 설정
        return;
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {showProfile && (
            <View style={styles.profileContainer}>
              <Image
                source={require('../../../../carpool-client/src/asset/user-profile-default.png')}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>사용자 이름</Text>
            </View>
          )}
          <Text style={styles.title}>목적지에 도착했습니다.</Text>
          <Text style={styles.subtitle}>동행자에 대한 나의 평점은?</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable key={star} onPress={() => handleRatingPress(star)}>
                <Icon
                  name={
                    star <= rating
                      ? 'star'
                      : 'star-outline'
                  }
                  size={32}
                  color={star <= rating ? '#FFD700' : '#E0E0E0'}
                />
              </Pressable>
            ))}
          </View>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>확인</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

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
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReviewModal;
