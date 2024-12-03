import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyMenuHomeScreen from "../../screens/profile/MyMenuHomeScreen";
import PointsHistoryScreen from "../../screens/profile/PointsHistoryScreen";
import UsageHistoryScreen from "../../screens/profile/UsageHistoryScreen";

export type MyMenuStackParamList = {
  MyMenu: undefined;
  PointsHistory: undefined;
  UsageHistory: undefined;
};

const Stack = createStackNavigator();

function MyMenuNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyMenuHome" component={MyMenuHomeScreen} />
      <Stack.Screen name="PointsHistory" component={PointsHistoryScreen} />
      <Stack.Screen name="UsageHistory" component={UsageHistoryScreen} />
    </Stack.Navigator>
  );
}

export default MyMenuNavigator;
