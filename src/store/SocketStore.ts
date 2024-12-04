// store/SocketStore.ts
import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import Config from "react-native-config";
import axiosInstance from "../api/axios";


interface ChatMessage {
    _id: string;
    text: string;
    user: { _id: string; username: string };
    createdAt: Date;
}

interface SocketStore {
    socket: Socket | null;
    messages: ChatMessage[];
    connect: (roomId: string) => void;
    disconnect: () => void;
    addMessage: (message: ChatMessage) => void;
}

const useSocketStore = create<SocketStore>((set) => ({
    socket: null,
    messages: [],
    connect: (roomId) => {
        const token = axiosInstance.defaults.headers.common['Authorization'];

        if (!token) {
            console.error('No token found in axios headers');
            return;
        }
        const socket = io(`${Config.WEBSOCKET_URL}/chatroom`, {
            query: { roomId },
            extraHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });

        socket.on('connect', () => {
            console.log('Connected to chatroom');
        });

        socket.on('message', (message) => {
            set((state) => ({
                messages: [
                    ...state.messages,
                    {
                        _id: message.id,
                        text: message.content,
                        user: { _id: message.senderId, username: message.sender },
                        createdAt: new Date(),
                    },
                ],
            }));
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        set({ socket });
    },
    disconnect: () => {
        set((state) => {
            state.socket?.disconnect();
            return { socket: null, messages: [] };
        });
    },
    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),
}));

export default useSocketStore;
