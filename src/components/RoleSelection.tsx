import React from "react";
import {View, Text, Pressable, StyleSheet} from "react-native";
import {colors} from "../constants";

interface RoleSelectionProps {
    selectedRole: 'driver' | 'passenger' | undefined;
    onSelectRole: (role: 'driver' | 'passenger') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({selectedRole, onSelectRole}) => {
    return (
        <View style={styles.roleButtonContainer}>
            <Text style={styles.roleTitle}>역할을 선택해주세요:</Text>
            <View style={styles.roleButtonRow}>
                <Pressable
                    style={[
                        styles.roleButton,
                        styles.leftButton,
                        selectedRole === 'passenger' && styles.roleButtonActive,
                    ]}
                    onPress={() => onSelectRole('passenger')}
                >
                    <Text style={[
                        styles.roleButtonText,
                        selectedRole === 'passenger' && styles.roleButtonTextActive
                    ]}>
                        탑승자로 가입하기
                    </Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.roleButton,
                        styles.rightButton,
                        selectedRole === 'driver' && styles.roleButtonActive,
                    ]}
                    onPress={() => onSelectRole('driver')}
                >
                    <Text style={[
                        styles.roleButtonText,
                        selectedRole === 'driver' && styles.roleButtonTextActive
                    ]}>
                        운전자로 가입하기
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    roleButtonContainer: {
        marginVertical: 20,
    },
    roleTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    roleButtonRow: {
        flexDirection: "row",
        overflow: "hidden",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.GRAY_500,
    },
    roleButton: {
        flex: 1,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.WHITE,
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
    roleButtonActive: {
        backgroundColor: colors.BLUE_ACTIVE,
        borderColor: colors.BLUE_ACTIVE,
    },
    roleButtonText: {
        fontSize: 16,
        color: colors.GRAY_700,
    },
    roleButtonTextActive: {
        color: colors.WHITE,
    },
});

export default RoleSelection;
