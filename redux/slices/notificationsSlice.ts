
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ReminderMessage {
  title: string;
  body: string;
  timestamp: string;
  activityType?: string;
  dayName?: string;
  reminderTime?: string;
}


interface NotificationsState {
  messages: ReminderMessage[];
  hasUnread: boolean;
}

const initialState: NotificationsState = {
  messages: [],
  hasUnread: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<ReminderMessage>) {
      state.messages.unshift(action.payload);
      state.hasUnread = true;
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
   markAllAsRead: (state) => {
      state.hasUnread = false;
    },
  },
});

export const { addMessage, removeMessage, setMessages, clearMessages, markAllAsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;
