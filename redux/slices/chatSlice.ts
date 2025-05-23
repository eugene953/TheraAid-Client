import { ChatMessage } from "@/types/chatTypes";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface chatState {
    messages: ChatMessage[];
}

const initialState: chatState = {
    messages: [],
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<ChatMessage>) => {
            state.messages.push(action.payload);
        },
        clearMessages: (state) => {
state.messages = [];
        },
    },
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;