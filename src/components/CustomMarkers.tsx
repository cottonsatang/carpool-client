import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Marker, Callout} from 'react-native-maps';
import {colors} from '../constants';

const colorHex = {
  BLUE: colors.BLUE_300,
  RED: colors.RED_500,
  YELLOW: colors.YELLOW_200,
} as const;

type MarkerColor = keyof typeof colorHex;

interface CustomMarkerProps {
  color: MarkerColor;
  coordinate: {latitude: number; longitude: number};
  name: string;

  onPress?: () => void;
}

function CustomMarker({
  color,
  coordinate,
  name,
  onPress,
  ...props
}: CustomMarkerProps) {
  return (
    <Marker
      coordinate={coordinate}
      {...props}
      onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.marker, {backgroundColor: colorHex[color]}]} />
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 32,
    alignItems: 'center',
  },
  marker: {
    transform: [{rotate: '45deg'}],
    width: 27,
    height: 27,
    borderRadius: 27,
    borderBottomRightRadius: 1,
    borderWidth: 1,
    borderColor: colors.BLACK,
  },
  callout: {
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    color: colors.BLACK,
    fontSize: 14,
  },
  calloutDescription: {
    color: colors.GRAY_700,
    fontSize: 12,
  },
});

export default CustomMarker;
