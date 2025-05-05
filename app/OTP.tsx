
import InputField from '@/components/InputField';
import SocialLoginButton from '@/components/SocialLoginButton';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Link } from 'expo-router';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

const OTP = () => {

  // const { email } = useLocalSearchParams(); // Getting email from previous screen

  const [otp, setOtp] = useState('');

  const handleSubmit = async () =>  {
    if (!otp) {
    return Alert.alert('Error', 'please enter the OTP code');
  }

try {
  const response = await axios.post('https://spicy-bananas-lose.loca.lt/verifyOTP', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: otp }),
  });

  if (response.status === 200) {
    router.push('/CreateNewPwd');
      } else {
        Alert.alert('Error', response.data.error || 'Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Network or server error');
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
       <Text style={styles.title}>OTP code verification 🔐</Text>
         <Text style={styles.description}>We have sent an OTP code to your email and********ley@yourdomain.com. Enter the OTP code below to verify.</Text>


         <TextInput
          style={styles.otpInput}
          placeholder="Enter OTP"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
          maxLength={6}
        />
    
       <Text style={styles.did}>Didn't receive email?</Text>
        <Text style={styles.did}>You can resend code in 55s</Text>

<Link href={"/CreateNewPwd"} asChild>
    <TouchableOpacity
    onPress={handleSubmit} 
    style={styles.continue}>
      <Text style={styles.continueTxt}>Continue</Text>
   
       </TouchableOpacity>
       </Link>

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
  otpInput: {
    borderRadius: 10,
    height: 60,
    width: 200,
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 20,
    fontSize: 20,
    textAlign: 'center',
    top: -100,
  },
  did:{
    top:-70,
  },
    inputField:{
   gap: 15, 
  alignSelf: 'stretch',
 left:10, 
 top:-130,
 flexDirection: 'row',
          },
          input: {
            borderRadius: 10,
            height: 60,
            backgroundColor: Colors.lightGray,
            paddingHorizontal: 30,
            marginTop:10,
            left:-6,
         
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

export default OTP;
