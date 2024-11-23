import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../constants';
import useAuth from '../../hooks/queries/useAuth';
import {ResponseProfile} from '../../api/auth';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {logoutMutation, getProfileQuery} = useAuth();
  const {name, profile, role} = (getProfileQuery.data as ResponseProfile) || {};
  const imageUrl = profile?.profilePicture || '';

  const getRoleText = (userRole?: 'driver' | 'passenger') => {
    switch (userRole) {
      case 'driver':
        return '드라이버';
      case 'passenger':
        return '탑승자';
      default:
        return 'Loading or Network Error';
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

  return (
      <SafeAreaView style={styles.container}>
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.contentContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.imageWrapper}>
              {imageUrl && imageUrl !== '' ? (
                  <Image
                      source={{uri: imageUrl}}
                      style={styles.profileImage}
                      resizeMode="cover"
                  />
              ) : (
                  <Image
                      source={require('../../asset/user-profile-default.png')}
                      style={styles.profileImage}
                      resizeMode="cover"
                  />
              )}
            </View>
            <Text style={styles.nameText}>{name || '익명'}</Text>
            <Text style={styles.roleText}>
              {getRoleText(role)}
            </Text>
          </View>
          <View style={styles.drawerItemList}>
            <DrawerItemList {...props} />
          </View>
          <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>로그아웃</Text>
          </Pressable>
        </DrawerContentScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_300,
    gap: 8,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 8,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  drawerItemList: {
    flexGrow: 1,
    marginTop: 16,
  },
  logoutButton: {
    alignItems: 'flex-end',
    padding: 10,
  },
  logoutText: {
    fontSize: 14,
    color: colors.RED_500,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.GRAY_500,
  }
});

export default CustomDrawerContent;
