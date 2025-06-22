// store/slices/chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  sessionId: number;
}

const initialState: ChatState = {
  sessionId: 0,
};

export const chatSessionSlice = createSlice({
  name: 'chatSession',
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<number>) => {
      state.sessionId = action.payload;
    },
    clearSession: (state) => {
      state.sessionId = 0;
    }
  },
});

export const { setSessionId, clearSession } = chatSessionSlice.actions;
export default chatSessionSlice.reducer;
