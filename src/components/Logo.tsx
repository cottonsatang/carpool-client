import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from "../constants";

const LogoComponent = () => {
    return (
        <View style={styles.circle}>
            <Text style={styles.logoText}>너만오면GO</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        width: 195,
        height: 195,
        borderRadius: 195 / 2,
        backgroundColor: colors.BLUE_700,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 36,
        color: 'white',
        fontFamily: 'Roboto', // Roboto 폰트를 사용하도록 설정
    },
});

export default LogoComponent;
