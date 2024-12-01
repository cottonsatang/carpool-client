import React, { useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-gifted-chat';
import useSocketStore from '../../store/SocketStore';
import useDriverLocationStore from "../../store/DriverLocation";
import useUserLocation from '../../hooks/useUserLocation'; // 사용자 위치 훅

const ChatScreen = ({ route }: { route: { params: { roomId: string; token: string; isDriver: boolean } } }) => {
    const { roomId, token, isDriver } = route.params;
    const { connect, disconnect, socket, addMessage, messages } = useSocketStore();
    const { setLocation } = useDriverLocationStore();
    const { userLocation, isUserLocationError } = useUserLocation(); // 사용자 위치 가져오기

    useEffect(() => {
        connect(roomId, token);
        return () => {
            disconnect();
        };
    }, [roomId, token, connect, disconnect]);

    useEffect(() => {
        if (socket) {
            socket.on('message', (data) => {
                if (data.coordinate) {
                    console.log('Driver location received:', data.coordinate);
                    setLocation(data.coordinate); // 운전자 좌표를 상태로 저장
                }

                addMessage({
                    _id: Date.now().toString(),
                    text: data.message,
                    user: { _id: data.userName, username: data.userName },
                    createdAt: new Date(),
                });
            });
        }

        return () => {
            socket?.off('message');
        };
    }, [socket, addMessage, setLocation]);

    const onSend = (newMessages: IMessage[] = []) => {
        if (newMessages[0] && socket) {
            const messagePayload: any = {
                room: roomId,
                message: newMessages[0].text,
            };

            if (isDriver && !isUserLocationError && userLocation) {
                messagePayload.coordinate = {
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                };
            }

            socket.emit('send', messagePayload);

            addMessage({
                _id: newMessages[0]._id.toString(),
                text: newMessages[0].text,
                user: { _id: 'currentUserId', username: isDriver ? 'Driver' : 'Passenger' },
                createdAt: new Date(),
            });
        }
    };

    return (
        <GiftedChat
            messages={messages.map((msg) => ({
                _id: msg._id,
                text: msg.text,
                user: msg.user,
                createdAt: msg.createdAt,
            }))}
            onSend={(messages) => onSend(messages)}
            user={{ _id: 'currentUserId' }}
        />
    );
};

export default ChatScreen;
