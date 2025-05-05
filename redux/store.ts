import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import signupReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
   
    signup: signupReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
