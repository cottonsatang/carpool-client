import React from 'react';
import { GiftedChat, IMessage } from 'react-gifted-chat';
import useChatStore from '../../store/ChatStore';
import useChatSocket from '../../hooks/useChatSocket';
import { RouteProp } from '@react-navigation/native';

type ChatScreenRouteProps = RouteProp<{ Chat: { roomId: string; token: string } }, 'Chat'>;

const ChatScreen = ({ route }: { route: ChatScreenRouteProps }) => {
    const { roomId, token } = route.params;
    const messages = useChatStore((state) => state.messages);
    const addMessage = useChatStore((state) => state.addMessage);

    const socket = useChatSocket(roomId, token);

    const onSend = (newMessages: IMessage[] = []) => {
        if (newMessages[0]) {
            socket.emit('send', {
                room: roomId,
                message: newMessages[0].text,
            });
            addMessage({
                id: newMessages[0]._id.toString(),
                sender: 'currentUserId', // 사용자 ID 설정
                content: newMessages[0].text,
            });
        }
    };

    return (
        <GiftedChat
            messages={messages.map((msg) => ({
                _id: msg.id,
                text: msg.content,
                user: { _id: msg.sender, username: msg.sender },
                createdAt: new Date(),
            }))}
            onSend={(messages) => onSend(messages)}
            user={{ _id: 'currentUserId' }}
        />
    );
};

export default ChatScreen;
