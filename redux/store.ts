import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './slices/loginSlice';
import signupReducer from './slices/signupSlice';
import chatReducer from './slices/chatSlice';
import chatSessionReducer from './slices/chatSessionSlice';
import notificationsSlice from './slices/notificationsSlice';

const rootReducer = combineReducers({
  signup: signupReducer,
  auth: authReducer,
  chat: chatReducer,
  chatSession: chatSessionReducer,
  notifications: notificationsSlice,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['chat', 'notifications'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
