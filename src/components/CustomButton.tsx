import React from "react";
import { Pressable, StyleSheet, Text, PressableProps, Dimensions } from "react-native";
import { colors } from "../constants";

interface CustomButtonProps extends PressableProps {
    label: string;
    variant?: 'filled' | 'outlined';
    size?: 'large' | 'medium';
    inValid?: boolean;
}

function CustomButton({ label, variant = 'filled', size = 'large', inValid = false, ...props }: CustomButtonProps) {
    return (
        <Pressable
            disabled={inValid}
            style={({ pressed }) => [
                styles.container,
                styles[variant],
                styles[size],
                pressed ? styles[`${variant}Pressed`] : styles[`${variant}`],
                inValid && styles.inValid // 조건부 스타일링
            ]}
            {...props}>
            <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10, // 패딩 수평만 설정
        width: "100%",
    },
    inValid: {
        opacity: 0.5,
    },
    filled: {
        backgroundColor: colors.BLUE_700,
    },
    outlined: {
        borderColor: colors.BLUE_700,
        borderWidth: 1,
    },
    filledPressed: {
        backgroundColor: colors.BLUE_500,
    },
    outlinedPressed: {
        backgroundColor: colors.BLUE_700,
        borderWidth: 1,
        opacity: 0.5,
    },
    large: {
        height: 50, // Nexus 5에 맞는 고정 높이
    },
    medium: {
        height: 40, // Nexus 5에 맞는 고정 높이
    },
    text: {
        fontSize: 18,
        fontWeight: "700",
    },
    filledText: {
        color: colors.WHITE,
    },
    outlinedText: {
        color: colors.BLUE_700,
    },
});

export default CustomButton;
