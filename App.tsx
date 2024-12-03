// @ts-ignore
import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigations/root/RootNavigator';
import {QueryClientProvider} from "@tanstack/react-query";
import queryClient from "./src/api/queryClient";
import Config from "react-native-config";
import { NotificationProvider } from './src/context/NotificationProvider'; // 알림 컨텍스트 임포트
import NotificationBar from './src/components/NotificationBar';
function App() {
    console.log("Config ", Config);
    return (
        <NotificationProvider>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <RootNavigator />
                    <NotificationBar />
                </NavigationContainer>
            </QueryClientProvider>
        </NotificationProvider>
    );
}

export default App;
