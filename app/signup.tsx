
import InputField from '@/components/InputField';
import SocialLoginButton from '@/components/SocialLoginButton';
import { Colors } from '@/constants/Colors';
import { setSignupStepOne } from '@/redux/slices/signupSlice';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Link } from 'expo-router';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';

const Signup = () => {

const dispatch = useDispatch();

const [agreed, setAgreed] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errors, setErrors] = useState({ email: '', password: '', agreed: '' });

const validate = () =>{
  let valid = true;
  const newErrors = {email:'', password:'', agreed:''};

  if (!email) {
    newErrors.email = 'Email is required';
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = 'Email is invalid';
    valid = false;
  }

  if (!password) {
    newErrors.password = 'Password is required';
    valid = false;
  } else if (password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
    valid = false;
  }

  if (!agreed) {
    newErrors.agreed = 'You must agree to the terms';
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};

const handleContinue = () => {
  if (validate()) {
    dispatch(setSignupStepOne({ email, password }));
    router.push('/signupTwo');
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
       <Text style={styles.title}>Hello there👋</Text>
         <Text style={styles.description}>Please enter your email & password to create an account</Text>


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
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

<Text style={styles.label}>Password</Text>
       <InputField
       style={styles.input}
       placeholder='Password'
       placeholderTextColor={Colors.gray}
       secureTextEntry={!showPassword}
       value={password}
       onChangeText={setPassword}
       />  
        <Ionicons style={styles.password} name={showPassword ? "eye" : "eye-off"} size={20}
        color={Colors.primary}
         onPress={() => setShowPassword(!showPassword)}
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
       </View>

       <View style={styles.checkboxContainer}>
      <TouchableOpacity
        onPress={() => setAgreed(!agreed)}
        style={[styles.checkbox, agreed && styles.checkboxChecked]}
      >
        {agreed && <Ionicons name="checkmark" size={14} color="#fff" />}
      </TouchableOpacity>

      <Text style={styles.text}>
        I agree to TheraAid{' '}
        <Text style={styles.link}>Public Agreement,Terms</Text> {' '} 
        <Text style={styles.link}> & Privacy Policy</Text>
      </Text>
    </View>
    {errors.agreed ? <Text style={styles.errorText}>{errors.agreed}</Text> : null}

    <View style={styles.divider}/>

       <Text style={styles.loginTxt}> 
            <Text>Already have an account? {''}</Text>
            <Link href={"/signin"} asChild>
            <TouchableOpacity>
                <Text style={styles.loginTxtSpan}> Log in</Text>
            </TouchableOpacity>
            </Link>
            </Text>

     <Text  style={{marginBottom:20,}}> or continue with</Text>

    <SocialLoginButton emailHref="/signin" />


    <TouchableOpacity 
    style={styles.continue}
    onPress={handleContinue}>
    <Text style={styles.continueTxt} >Continue</Text>
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
   top:5,
   left:-60,
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
            marginBottom: 10,
            marginTop: -5,
            marginLeft: 10,
            fontSize: 13,
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
      color: '#7e8cff',
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
          
          },
          checkbox: {
            width: 20,
            height: 20,
            borderWidth: 1.5,
            borderColor: Colors.primary,
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          },
          checkboxChecked: {
            backgroundColor: Colors.primary,
          },
          text: {
            flex: 1,
            color: '#333',
            fontSize: 14,
  
          },
          link: {
            color: '#7e8cff',
            textDecorationLine: 'underline',
          },
});

export default Signup;
