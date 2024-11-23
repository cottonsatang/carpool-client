import React from 'react';
import AuthStackNavigator from "../stack/AuthStackNavigator";
import MainDrawerNavigator from "../drawer/MainDrawerNavigator";
import useAuth from "../../hooks/queries/useAuth";
import LoadingScreen from "../../screens/LoadingScreen";

function RootNavigator() {
    const {isLogin, isLoading, role} = useAuth(); // hook
    if (isLoading) {
        return <LoadingScreen />;
    }
    console.log("role: ", role);
    return (
        <>
            {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
        </>
    );
    // return role === 'driver' ? <DriverStackNavigator /> : <PassengerStackNavigator />;
}

export default RootNavigator;

