import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  user_id: number | null;
  role: 'user' | 'admin' | null;
  email: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user_id: null,
  role: null,
  email: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user_id: number;
        role: 'user' | 'admin';
        email: string;
        token: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user_id = action.payload.user_id;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user_id = null;
      state.role = null;
      state.email = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;