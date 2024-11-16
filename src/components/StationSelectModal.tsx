import React from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { colors } from "../constants";
import type { StationLocation } from "../constants/stationlocations";
import { getDistance } from "geolib";
import useUserLocation from "../hooks/useUserLocation";

interface StationSelectModalProps {
    visible: boolean;
    onClose: () => void;
    stations: StationLocation[];
    onSelect: (stationId: number) => void;
    type: "start" | "end";
}

function StationSelectModal({
                                visible,
                                onClose,
                                stations,
                                onSelect,
                                type,
                            }: StationSelectModalProps) {
    const { userLocation } = useUserLocation();

    const calculateDistance = (stationCoordinate: { latitude: number; longitude: number }) => {
        if (!userLocation) return "거리 계산 중...";

        const distanceInMeters = getDistance(
            { latitude: userLocation.latitude, longitude: userLocation.longitude },
            stationCoordinate
        );

        if (distanceInMeters < 1000) {
            return `${distanceInMeters}m`;
        }
        return `${(distanceInMeters / 1000).toFixed(1)}km`;
    };

    const renderStation = ({ item }: { item: StationLocation }) => (
        <Pressable
            style={({ pressed }) => [
                styles.stationItem,
                pressed && styles.stationItemPressed,
            ]}
            onPress={() => {
                onSelect(item.id);
                onClose();
            }}
        >
            <View style={styles.stationContent}>
                <Text style={styles.stationName}>{item.name}</Text>
                <Text style={styles.stationAddress}>{item.address}</Text> {/* 주소 표시 */}
                <Text style={styles.stationDistance}>
                    거리: {calculateDistance(item.coordinate)}
                </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.GRAY_500} />
        </Pressable>
    );

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <Pressable style={styles.dismissArea} onPress={onClose} />
                <View style={styles.modalContainer}>
                    <View style={styles.dragIndicator} />
                    <Text style={styles.modalTitle}>
                        {type === "start" ? "출발지" : "도착지"} 선택
                    </Text>
                    <FlatList
                        data={stations}
                        renderItem={renderStation}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    dismissArea: {
        flex: 1,
    },
    modalContainer: {
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
        maxHeight: "70%",
    },
    dragIndicator: {
        width: 40,
        height: 4,
        backgroundColor: colors.GRAY_500,
        alignSelf: "center",
        borderRadius: 2,
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.BLACK,
        marginBottom: 16,
    },
    stationItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
    },
    stationItemPressed: {
        backgroundColor: colors.GRAY_200,
    },
    stationContent: {
        flex: 1,
    },
    stationName: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.BLACK,
    },
    stationAddress: {
        fontSize: 14,
        color: colors.GRAY_500,
    },
    stationDistance: {
        fontSize: 14,
        color: colors.GRAY_500,
    },
    separator: {
        height: 1,
        backgroundColor: colors.GRAY_300,
        marginHorizontal: 16,
    },
});

export default StationSelectModal;
