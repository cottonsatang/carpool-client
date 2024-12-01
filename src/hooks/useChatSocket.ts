import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import useChatStore from '../store/ChatStore';

const useChatSocket = (roomId: string, token: string) => {
    const addMessage = useChatStore((state) => state.addMessage);
    const clearMessages = useChatStore((state) => state.clearMessages);
    let socket: Socket;

    useEffect(() => {
        socket = io(`${process.env.API_URL}/chatroom`, {
            query: { roomId },
            extraHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });

        socket.on('message', (data) => {
            addMessage(data);
        });

        socket.on('connect', () => {
            console.log('Connected to chatroom');
        });

        socket.on('error', (err) => {
            console.error('Socket error:', err);
        });

        return () => {
            socket.disconnect();
            clearMessages();
        };
    }, [roomId, token, addMessage, clearMessages]);

};

export default useChatSocket;
