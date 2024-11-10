import React from 'react';
import AuthStackNavigator from "../stack/AuthStackNavigator";
import MainDrawerNavigator from "../drawer/MainDrawerNavigator";
import useAuth from "../../hooks/queries/useAuth";

function RootNavigator() {
    const {isLogin} = useAuth(); // hook
    console.log("isLogIn" ,isLogin);
    const logged = true;
    // return <>{logged ? <MainDrawerNavigator/> : <AuthStackNavigator/>}</>;
    return <>{isLogin ? <MainDrawerNavigator/> : <AuthStackNavigator/>}</>;
}

export default RootNavigator;

