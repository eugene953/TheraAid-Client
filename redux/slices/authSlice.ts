import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignupState {
  email: string;
  password: string;
  username: string;
  gender: string;
  phone_number: string;
}

const initialState: SignupState = {
  email: '',
  password: '',
  username: '',
  gender: '',
  phone_number: '',
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setSignupStepOne: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    setSignupStepTwo: (
      state,
      action: PayloadAction<{
        username: string;
        gender: string;
        phone_number: string;
      }>
    ) => {
      state.username = action.payload.username;
      state.gender = action.payload.gender;
      state.phone_number = action.payload.phone_number;
    },
    clearSignup: () => initialState,
  },
});

export const { setSignupStepOne, setSignupStepTwo, clearSignup } = signupSlice.actions;
export default signupSlice.reducer;
