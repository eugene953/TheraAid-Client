
import InputField from '@/components/InputField';
import SocialLoginButton from '@/components/SocialLoginButton';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Link } from 'expo-router';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '@/config';
import { login } from '@/redux/slices/loginSlice';
import { jwtDecode } from 'jwt-decode';
import SigninSuccessModal from '@/components/Modal/SigninSuccessModal';
import { RootState } from '@/redux/store';

type JWTPayload = {
  id: number;
  role: 'user' | 'admin';
};

const Signin = () => {

const [agreed, setAgreed] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');

const [isModalVisible, setModalVisible] = useState(false);

const dispatch = useDispatch();
const auth = useSelector((state: RootState) => state.auth);

useEffect(() => {
  if (auth.token) {
    try {
      const decoded = jwtDecode<JWTPayload>(auth.token);
      if (decoded.role === 'admin') {
        router.replace('/(tabs)/Admin/home'); 
      }
    } catch (error) {
      console.error('Invalid token', error);
    }
  }
}, [auth.token]);

const validate = () => {
  let valid = true;
  setEmailError('');
  setPasswordError('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    setEmailError('Email is required');
    valid = false;
  } else if (!emailRegex.test(email)) {
    setEmailError('Invalid email format');
    valid = false;
  }

  if (!password) {
    setPasswordError('Password is required');
    valid = false;
  }

  return valid;
};

const handleLogin = async() => {
  if (!validate()) return;
  
  try{
    const response = await axios.post(`${API_URL}/api/users/login`, {
      email,
      password,
    });

    setModalVisible(true);

  const { token } = response.data;

   // Save token to AsyncStorage
   await AsyncStorage.setItem('token', token);

  const decoded: any = jwtDecode(token);
  dispatch(login({ 
    user_id: decoded.user_id,
    role: decoded.role,
    email: decoded.email, 
    token,
   }));

  }catch(error: any) {
    console.error('Login failed', error.response?.data || error.message);
    if (error.response?.status === 401 || error.response?.status === 404) {
      alert(error.response.data?.message || 'Invalid credentials');
    } else {
      alert('Login failed. Please try again.');
    }
  }
};

  return (
    <>
    <Stack.Screen options={{headerShown: false,}}/>
     <TouchableOpacity style={styles.arrow}
      onPress={() => router.back()}>
        <Ionicons name='arrow-back' size={24} color={Colors.primary} />
      </TouchableOpacity>
    
    <View style={styles.container}>
       <Text style={styles.title}>Welcome back👋</Text>
         <Text style={styles.description}>Please enter your email & password to log in.</Text>


       <View style={styles.inputField}>
<Text style={styles.label}>Email address</Text>
       <InputField
       style={styles.input}
              placeholder='Email Address'
               placeholderTextColor={Colors.gray}
               autoCapitalize='none'
                 keyboardType='email-address'
                 value={email}
            onChangeText={setEmail}
       />
        <Ionicons style={styles.mail} name='mail' size={20} color={Colors.primary} />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

<Text style={styles.label}>Password</Text>
       <InputField
       style={styles.input}
       placeholder='Password'
       placeholderTextColor={Colors.gray}
       secureTextEntry={!showPassword}
       value={password}
       onChangeText={setPassword}
       />  
        <Ionicons
        style={styles.password}
         name={showPassword ? "eye" : "eye-off"}
         size={20}
         color={Colors.primary}
         onPress={() => setShowPassword(!showPassword)}
        />
         {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
       </View>

       <View style={styles.checkboxContainer}>
      <TouchableOpacity
        onPress={() => setAgreed(!agreed)}
        style={[styles.checkbox, agreed && styles.checkboxChecked]}
      >
        {agreed && <Ionicons name="checkmark" size={14} color="#fff" />}
      </TouchableOpacity>

      <Text style={styles.text}>Remember me </Text>
    </View>

    <View style={styles.divider}/>

    <Link href={"/ResetPassword"} asChild>
  <TouchableOpacity>
    <Text style={styles.link}>Forgot password?</Text>
    </TouchableOpacity> 
  </Link>

       <Text style={styles.loginTxt}> 
            <Text>Don't have an account? {''}</Text>
            <Link href={"/signup"} asChild>
            <TouchableOpacity>
                <Text style={styles.loginTxtSpan}> Signup</Text>
            </TouchableOpacity>
            </Link>
            </Text>

     <Text  style={{marginBottom:20,}}> or continue with</Text>

     <SocialLoginButton emailHref="/signin" />


    <TouchableOpacity style={styles.continue} onPress={handleLogin}>
      <Text style={styles.continueTxt}>Log in</Text>
       </TouchableOpacity>
       
       <SigninSuccessModal
      visible={isModalVisible}
      onClose={() => {
      setModalVisible(false);
      router.dismissAll();
      router.push('/(tabs)/User/homeScreen'); 
      }}
      />

    </View>
    </>
  );
};

const styles = StyleSheet.create({
arrow:{
top:5,
left:20,
},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   padding:20,
   backgroundColor: Colors.white,
  },
  title:{
   top:3,
   left:-40,
    fontSize:30,
    fontWeight:'bold',
    letterSpacing: 1.2,
    color: Colors.primary,
    marginBottom:50, 
    },
  description:{
   top:-25,
   left:-2,
   fontSize: 15.5,
   lineHeight:25,
  },
    inputField:{
   gap: 5, 
  alignSelf: 'stretch',
 left:10, 


          },
          label: {
            fontSize: 16,
            color: Colors.primary,
            marginBottom: 8,
            fontWeight: 'bold',
            left:-10,
          },
          input: {
            borderRadius: 50,
            height: 50,
            backgroundColor: Colors.lightGray,
            paddingHorizontal: 15,
            left:-6,
          },
          mail:{
           top:-45,
            right:-270,
          },
          password:{
           top:-45,
           right:-270,
          },
          errorText: {
            color: 'red',
            fontSize: 12,
            marginTop: 4,
            left: -6,
          },
   btn:{
backgroundColor: Colors.primary,
paddingVertical:14,
paddingHorizontal:18,
alignSelf: 'stretch',
alignItems: 'center',
borderRadius: 5,
marginBottom:20

    },
    btnTxt:{
color: Colors.white,
fontSize: 16,
fontWeight:'600',
    } ,
    loginTxt:{
      marginBottom:20,
      fontSize:14,
      color: Colors.primary,
      lineHeight: 24,
      
          },
          loginTxtSpan:{
      color:'#7e8cff',
      fontWeight: '600'
          },
      divider:{
borderTopColor: Colors.gray,
borderTopWidth: StyleSheet.hairlineWidth,
width: '100%',
margin:20
          },
          continue: {
            marginTop: 20,
            backgroundColor: '#7e8cff',
            width: 300,
            paddingVertical: 15,
              borderRadius: 40,
          },
          continueTxt: {
            alignSelf: 'center',
             color: 'white',
            fontWeight: 'bold'
           
          },
          checkboxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            left: -110,
          },
          checkbox: {
            width: 20,
            height: 20,
            borderWidth: 1.5,
            borderColor: Colors.primary,
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
           
          },
          checkboxChecked: {
            backgroundColor: Colors.primary,
          },
          text: {
           left:10,
            color: '#333',
            fontSize: 14,
  
          },
          link: {
            color: '#7e8cff',
            textDecorationLine: 'none',
            marginBottom: 5,
          },
});

export default Signin;
