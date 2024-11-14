// @ts-ignore
import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigations/root/RootNavigator';
import {QueryClientProvider} from "@tanstack/react-query";
import queryClient from "./src/api/queryClient";
import Config from "react-native-config";

function App() {
    console.log("Config ", Config);
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <RootNavigator/>
            </NavigationContainer>
        </QueryClientProvider>
    );
}

export default App;
