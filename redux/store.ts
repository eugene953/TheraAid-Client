import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/loginSlice';
import signupReducer from './slices/signupSlice';
import chatReducer from './slices/chatSlice';

const store = configureStore({
  reducer: {
   
    signup: signupReducer,
    auth: authReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
