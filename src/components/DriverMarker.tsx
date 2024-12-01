import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { colors } from '../constants';

interface DriverMarkerProps {
    coordinate: { latitude: number; longitude: number };
    onPress?: () => void;
}

function DriverMarker({ coordinate, onPress }: DriverMarkerProps) {
    return (
        <Marker coordinate={coordinate} onPress={onPress}>
            <View style={styles.container}>

                <Image
                    source={require('../assets/car_icon.png')} // 자동차 이미지를 저장한 경로
                    style={styles.carIcon}
                    resizeMode="contain"
                />
            </View>
        </Marker>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    carIcon: {
        width: 27,
        height: 27,
        tintColor: colors.BLUE_500,
    },
});

export default DriverMarker;
