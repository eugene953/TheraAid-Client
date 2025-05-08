import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImagePickerAsset } from 'expo-image-picker';

interface SignupState {
  email: string;
  password: string;
  username: string;
  phone_number: string;
  gender: string;
  profile: ImagePickerAsset | null ;
  
}

const initialState: SignupState = {
  email: '',
  password: '',
  username: '',
  phone_number: '',
  gender: '',
  profile: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setSignupStepOne: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    setSignupStepTwo: (state, action: PayloadAction<{ username: string; phone_number: string; gender: string; profile?: ImagePickerAsset | null }>) => {
      state.username = action.payload.username;
      state.phone_number = action.payload.phone_number;
      state.gender = action.payload.gender;
      state.profile = action.payload.profile ?? null;
    },
    clearSignup: () => initialState,
  },
});

export const { setSignupStepOne, setSignupStepTwo, clearSignup } = signupSlice.actions;

export default signupSlice.reducer;
