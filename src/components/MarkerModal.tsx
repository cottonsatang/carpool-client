import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants';

interface MarkerModalProps {
    visible: boolean;
    name: string;
    address: string; // 주소 추가
    onClose: () => void;
    onSetStart: () => void;
    onSetEnd: () => void;
}

function MarkerModal({
                         visible,
                         name,
                         address,
                         onClose,
                         onSetStart,
                         onSetEnd,
                     }: MarkerModalProps) {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{name}</Text>
                    <Text style={styles.modalSubtitle}>주소: {address}</Text>
                    <View style={styles.modalButtons}>
                        <Pressable
                            style={[styles.modalButton, { backgroundColor: colors.BLUE_500 }]}
                            onPress={onSetStart}>
                            <Text style={styles.modalButtonText}>출발지 설정</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.modalButton, { backgroundColor: colors.BLUE_500 }]}
                            onPress={onSetEnd}>
                            <Text style={styles.modalButtonText}>도착지 설정</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.modalButton, { backgroundColor: colors.RED_500 }]}
                            onPress={onClose}>
                            <Text style={styles.modalButtonText}>닫기</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: colors.WHITE,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 14,
        color: colors.GRAY_700,
        marginBottom: 20,
    },
    modalButtons: {
        width: '100%',
    },
    modalButton: {
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        color: colors.WHITE,
        fontSize: 16,
    },
});

export default MarkerModal;
