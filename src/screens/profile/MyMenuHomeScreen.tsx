import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import useAuth from "../../hooks/queries/useAuth";

function MyMenuHomeScreen() {
    const { logoutMutation } = useAuth();

    const handleLogout = () => {
        logoutMutation.mutate(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
            <Button title="로그아웃" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
});

export default MyMenuHomeScreen;
