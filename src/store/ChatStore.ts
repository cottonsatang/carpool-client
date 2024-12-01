import { create } from 'zustand';

type MessageType = {
    id: string;
    sender: string;
    content: string;
    coordinate?: { latitude: number; longitude: number };
};

type ChatState = {
    messages: MessageType[];
    addMessage: (message: MessageType) => void;
    clearMessages: () => void;
};

const useChatStore = create<ChatState>((set) => ({
    messages: [],
    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),
    clearMessages: () => set({ messages: [] }),
}));

export default useChatStore;
