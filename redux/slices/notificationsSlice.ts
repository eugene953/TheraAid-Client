
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ReminderMessage {
  activityType: string;
  dayName: string;
  reminderTime: string;
}

interface NotificationsState {
  messages: ReminderMessage[];
}

const initialState: NotificationsState = {
  messages: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<ReminderMessage>) {
      state.messages.unshift(action.payload);
    },
    removeMessage(state, action: PayloadAction<number>) {
      state.messages.splice(action.payload, 1);
    },
    setMessages(state, action: PayloadAction<ReminderMessage[]>) {
      state.messages = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const { addMessage, removeMessage, setMessages, clearMessages } = notificationsSlice.actions;

export default notificationsSlice.reducer;
