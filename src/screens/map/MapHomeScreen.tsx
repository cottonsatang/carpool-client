import React from "react";
import {Button, SafeAreaView, StyleSheet, Text, View,} from 'react-native';
import useAuth from "../../hooks/queries/useAuth";

function MapHomeScreen() {
    const {logoutMutation} = useAuth();
    const handleLogout = () => {
        logoutMutation.mutate(null);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>맵 스크린 위치할 곳</Text>
            <Button title={"로그아웃"} onPress={handleLogout} />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    }
});

export default MapHomeScreen;
