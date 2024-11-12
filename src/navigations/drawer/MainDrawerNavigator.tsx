import {createDrawerNavigator} from '@react-navigation/drawer';
import FeedHomeScreen from '../../screens/feed/FeedHomeScreen';
import ProfileHomeScreen from '../../screens/profile/ProfileHomeScreen';
import MapStackNavigator, {MapStackParamList} from '../stack/MapStackNavigator';
import {mainNavigations} from '../../constants';
import {NavigatorScreenParams} from '@react-navigation/native';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: undefined;
  [mainNavigations.PROFILE]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.PROFILE}
        component={ProfileHomeScreen}
        options={{
          title: '프로필',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedHomeScreen}
        options={{
          title: '피드',
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
