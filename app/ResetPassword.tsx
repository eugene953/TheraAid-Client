
import InputField from '@/components/InputField';
import SocialLoginButton from '@/components/SocialLoginButton';
import { API_URL } from '@/config';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { router, Stack } from 'expo-router';
import { Link } from 'expo-router';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';


const ResetPassword = () => {

  const [email, setEmail] = useState('');


 const handleSubmit =async () => {
    try {
      const res = await axios.post(`${API_URL}/generateOTP`, {
        email,
      });

      if (res.status === 200) {
        router.push({ pathname: '/OTP', params: { email } });
      } else {
        alert(res.data.error || 'Failed to send OTP');
      }
    } catch (err: any) {
      alert('Network error');
      console.error(err);
    }
  }


  return (
    <>
    <Stack.Screen options={{headerShown: false,}}/>
     <TouchableOpacity style={styles.arrow}
      onPress={() => router.back()}>
        <Ionicons name='arrow-back' size={24} color={Colors.primary} />
      </TouchableOpacity>
    
    <View style={styles.container}>
       <Text style={styles.title}>Reset your password 🔑</Text>
         <Text style={styles.description}>Please enter your email and we will send an OTP code in the next step to reset your password.</Text>


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

       </View>

    <TouchableOpacity 
    onPress={handleSubmit}
    style={styles.continue}>
      <Text style={styles.continueTxt}>Continue</Text>
       </TouchableOpacity>

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
   top:-140,
   left:-5,
    fontSize:25,
    fontWeight:'bold',
    letterSpacing: 1.2,
    color: Colors.primary,
    marginBottom:50, 
    },
  description:{
   top:-170,
   left:-2,
   fontSize: 15.5,
   lineHeight:25,
  },
    inputField:{
   gap: 5, 
  alignSelf: 'stretch',
 left:19, 
 top:-130,
          },
          label: {
            fontSize: 16,
            color: Colors.primary,
            fontWeight: 'bold',
            left:-10,
          },
          input: {
            borderRadius: 50,
            height: 50,
            backgroundColor: Colors.lightGray,
            paddingHorizontal: 15,
            marginTop:10,
            left:-12,
          },
          mail:{
           top:-45,
            right:-270,
          },
        
          continue: {
           top:160,
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

export default ResetPassword;
