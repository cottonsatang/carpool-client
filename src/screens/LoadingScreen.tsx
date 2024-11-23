import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import LogoComponent from '../components/Logo'; // 로고 컴포넌트 가져오기
import {colors} from '../constants';

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <LogoComponent />
            <ActivityIndicator size="large" color={colors.BLUE_700} style={styles.indicator} />
            <Text style={styles.loadingText}>잠시만 기다려주세요...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
    indicator: {
        marginTop: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: colors.GRAY_500,
        fontFamily: 'Roboto',
    },
});

export default LoadingScreen;
