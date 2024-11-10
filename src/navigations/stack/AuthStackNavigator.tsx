import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import AuthHomeScreen from "../../screens/auth/AuthHomeScreen";
import LogInScreen from "../../screens/auth/LogInScreen";
import SignUpScreen from "../../screens/auth/SignUpScreen";
import {authNavigations} from "../../constants";

export type AuthStackParamList = {
    [authNavigations.AUTH_HOME]: undefined;
    [authNavigations.LOGIN]: undefined;
    [authNavigations.SIGNUP]: undefined;
};

const Stack = createStackNavigator();

function AuthStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            cardStyle: {
                backgroundColor: 'white',
            },
            headerStyle: {
                backgroundColor: 'white',
                shadowColor: 'grey',
            },
            headerTitleStyle: {
                fontSize: 15,
            },
            headerTintColor: 'black',
        }}>
            <Stack.Screen
                name={authNavigations.AUTH_HOME}
                component={AuthHomeScreen}
                options={{
                    headerTitle: '',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={authNavigations.LOGIN}
                component={LogInScreen}
                options={{
                    headerTitle: '로그인',
                }}
            />
            <Stack.Screen
                name={authNavigations.SIGNUP}
                component={SignUpScreen}
                options={{
                    headerTitle: '회원가입',
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({});
export default AuthStackNavigator;
