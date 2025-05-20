
import InputField from '@/components/InputField';
import { API_URL } from '@/config';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { router, Stack } from 'expo-router';
import { Link } from 'expo-router';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import ResetPasswordModal from '../components/Modal/ResetPasswordModal';


const CreateNewPwd = () => {

const [showPassword, setShowPassword] = useState(false);
const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const [isModalVisible, setModalVisible] = useState(false);

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(`${API_URL}/resetPassword`, {
        password,
        confirm_password: confirmPassword,
      });

      setModalVisible(true);
     
    } catch (error: any) {
      console.error('Reset password error:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Something went wrong';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
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
       <Text style={styles.title}>Create New Password 🔒</Text>
         <Text style={styles.description}>Create your new password. If you forget it, then you have to do forgot password.</Text>


       <View style={styles.inputField}>

<Text style={styles.label}>New Password</Text>
       <InputField
       style={styles.input}
       placeholder='Enter New Password'
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

        
<Text style={styles.label}>Confirm New Password</Text>
       <InputField
       style={styles.input}
       placeholder='Confirm New Password'
       placeholderTextColor={Colors.gray}
       secureTextEntry={!showPassword}
       value={confirmPassword}
       onChangeText={setConfirmPassword}
       />  
        <Ionicons
        style={styles.password}
         name={showPassword ? "eye" : "eye-off"}
         size={20}
         color={Colors.primary}
         onPress={() => setShowPassword(!showPassword)}
        />
       </View>

    <TouchableOpacity 
    style={styles.continue} onPress={handleResetPassword} disabled={loading}>
      <Text style={styles.continueTxt}>{loading ? 'Please wait...' : 'Continue'}</Text>
       </TouchableOpacity>
  
       <ResetPasswordModal
      visible={isModalVisible}
      onClose={() => {
      setModalVisible(false);
      router.dismissAll();
      router.push('/signin'); 
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
   top:-110,
   left:-5,
    fontSize:25,
    fontWeight:'bold',
    letterSpacing: 1.2,
    color: Colors.primary,
    marginBottom:50, 
    },
  description:{
   top:-140,
   left:-9,
   fontSize: 15.5,
   lineHeight:25,
  },
    inputField:{
   gap: 5, 
  alignSelf: 'stretch',
  top: -100,
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
        
          password:{
           top:-45,
           right:-270,
          },
  
          continue: {
            top: 90,
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
         
});

export default CreateNewPwd;
