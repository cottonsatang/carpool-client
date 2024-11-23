import {createDrawerNavigator} from '@react-navigation/drawer';
import MyMenuHomeScreen from '../../screens/profile/MyMenuHomeScreen';
import MapStackNavigator, {MapStackParamList} from '../stack/MapStackNavigator';
import {colors, mainNavigations} from '../../constants';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dimensions} from "react-native";
import CustomDrawerContent from "./CustomDrawerContent";

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.PROFILE]: undefined;
};

const Drawer = createDrawerNavigator();

function DrawerIcons(route: RouteProp<MainDrawerParamList, keyof MainDrawerParamList>, focused:boolean) {
  let iconName = '';
  switch (route.name) {
    case mainNavigations.HOME: {
      iconName = 'location-on';
      break;
    }
    case mainNavigations.PROFILE: {
        iconName = 'person';
        break;
    }
  }
  return <MaterialIcons name={iconName} size={18} color={focused?colors.BLACK : colors.GRAY_500} />;
}

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
        drawerContent={(props: any) => <CustomDrawerContent {...props} />}
        screenOptions={({ route } : any) => ({
            headerShown: false,
            drawerType: 'front',
            drawerStyle: {
                width: Dimensions.get('screen').width * 0.5,
                backgroundColor: colors.WHITE,
            },
            drawerActiveTintColor: colors.BLACK,
            drawerInactiveTintColor: colors.GRAY_500,
            drawerActiveBackgroundColor: colors.BLUE_300,
            drawerInactiveBackgroundColor: colors.GRAY_200,
            drawerLabelStyle: {
                fontWeight: "600",
            },
            drawerIcon: ({ focused }: { focused: boolean }) => DrawerIcons(route, focused),
        })}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{
          title: '카풀 매칭',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name={mainNavigations.PROFILE}
        component={MyMenuHomeScreen}
        options={{
          title: '마이메뉴',
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
