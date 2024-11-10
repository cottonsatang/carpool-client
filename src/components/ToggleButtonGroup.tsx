import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from "../constants";

interface ToggleButtonGroupProps {
    labelLeft: string;
    labelRight: string;
    selectedValue: string | null;
    onSelect: (value: string) => void;
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({ labelLeft, labelRight, selectedValue, onSelect }) => {
    return (
        <View style={styles.buttonGroupContainer}>
            <View style={styles.buttonRow}>
                <Pressable
                    style={[
                        styles.button,
                        styles.leftButton,
                        selectedValue === labelLeft && styles.buttonActive
                    ]}
                    onPress={() => onSelect(labelLeft)}
                >
                    <Text style={[
                        styles.buttonText,
                        selectedValue === labelLeft && styles.buttonTextActive
                    ]}>{labelLeft}</Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.button,
                        styles.rightButton,
                        selectedValue === labelRight && styles.buttonActive
                    ]}
                    onPress={() => onSelect(labelRight)}
                >
                    <Text style={[
                        styles.buttonText,
                        selectedValue === labelRight && styles.buttonTextActive
                    ]}>{labelRight}</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonGroupContainer: {
        marginVertical: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        overflow: 'hidden',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.GRAY_500,
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.WHITE,
        borderColor: colors.GRAY_500,
    },
    leftButton: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderRightWidth: 1,
        borderColor: colors.GRAY_500,
    },
    rightButton: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    buttonActive: {
        backgroundColor: colors.BLUE_ACTIVE,
        borderColor: colors.BLUE_ACTIVE,
    },
    buttonText: {
        fontSize: 16,
        color: colors.GRAY_700,
    },
    buttonTextActive: {
        color: colors.WHITE,
    },
});

export default ToggleButtonGroup;
