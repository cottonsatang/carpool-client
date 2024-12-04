import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import useSocketStore from '../../store/SocketStore';
import useDriverLocationStore from "../../store/DriverLocation";
import useUserLocation from '../../hooks/useUserLocation'; // 사용자 위치 훅

const ChatScreen = ({ route }: { route: { params: { roomId: string; isDriver: boolean } } }) => {
    const { roomId, isDriver } = route.params;
    const { connect, disconnect, socket, addMessage, messages } = useSocketStore();
    const { setLocation } = useDriverLocationStore();
    const { userLocation, isUserLocationError } = useUserLocation(); // 사용자 위치 가져오기

    const [text, setText] = useState(''); // 메시지 입력 상태
    const [chatMessages, setChatMessages] = useState<any[]>([]); // 메시지 리스트

    useEffect(() => {
        connect(roomId); // 소켓 연결
        return () => {
            disconnect(); // 컴포넌트 언마운트 시 소켓 연결 해제
        };
    }, [roomId, connect, disconnect]);

    useEffect(() => {
        if (socket) {
            socket.on('message', (data) => {
                if (data.coordinate) {
                    console.log('Driver location received:', data.coordinate);
                    setLocation(data.coordinate); // 운전자 좌표 상태 업데이트
                }
                // 받은 메시지를 채팅 목록에 추가
                setChatMessages((prevMessages) => [
                    {
                        id: Date.now().toString(),
                        text: data.message,
                        user: data.userName,
                        createdAt: new Date(),
                    },
                    ...prevMessages,
                ]);
            });
        }

        return () => {
            socket?.off('message');
        };
    }, [socket, setLocation]);

    const sendMessage = () => {
        if (text.trim() && socket) {
            const messagePayload: any = {
                room: roomId,
                message: text.trim(),
            };

            // 운전자인 경우 좌표 추가
            if (isDriver && !isUserLocationError && userLocation) {
                messagePayload.coordinate = {
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                };
            }

            // 서버에 메시지 전송
            socket.emit('send', messagePayload);

            // 메시지를 로컬 리스트에 추가
            setChatMessages((prevMessages) => [
                {
                    id: Date.now().toString(),
                    text,
                    user: isDriver ? 'Driver' : 'Passenger',
                    createdAt: new Date(),
                },
                ...prevMessages,
            ]);

            setText(''); // 입력 필드 초기화
        }
    };

    const renderMessage = ({ item }: { item: any }) => (
        <View
            style={[
                styles.messageContainer,
                item.user === (isDriver ? 'Driver' : 'Passenger')
                    ? styles.myMessage
                    : styles.otherMessage,
            ]}
        >
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>
                {new Date(item.createdAt).toLocaleTimeString()}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={chatMessages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                inverted // 최신 메시지를 위에 표시
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="메시지를 입력하세요"
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>전송</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    messageContainer: {
        padding: 10,
        margin: 5,
        borderRadius: 10,
        maxWidth: '80%',
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#4caf50',
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#e0e0e0',
    },
    messageText: {
        color: '#fff',
    },
    messageTime: {
        fontSize: 10,
        color: '#ccc',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ChatScreen;
