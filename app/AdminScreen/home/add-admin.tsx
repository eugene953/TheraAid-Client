import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import SocialLoginButton from '@/components/SocialLoginButton';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import InputField from '@/components/InputField';
import { router } from 'expo-router';
import { Stack } from 'expo-router';
import { useDispatch } from 'react-redux';
import { API_URL } from '@/config';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { login } from '@/redux/slices/loginSlice';

export default function AddAdmin() {

const dispatch = useDispatch();

const [showPassword, setShowPassword] = useState(false);
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errors, setErrors] = useState({ name: '', email: '', password: '' });

const validate = () =>{
  let valid = true;
  const newErrors = {name: '', email:'', password:''};

  if (!name.trim()) {
    newErrors.name = 'Full name is required';
    valid = false;
  }

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

  setErrors(newErrors);
  return valid;
};

const handleRegister = async () => {
  if (validate()) {
    try {
      const response = await axios.post(`${API_URL}/api/adminRegister`, {
        admin_name: name,
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        alert('Admin registered successfully'); 
      }
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;

      if (error.response?.status === 409) {
        alert('An admin with this email already exists.');
      } else {
        console.log('Registration Error:', error.response?.data || error.message);
        alert('Registration failed. Please try again');
      }
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
    <Text style={styles.title}>Register New Admin</Text>
<Text style={styles.description}>Please enter admin details to create an account</Text>

         <View style={styles.inputField}>
<Text style={styles.label}>Admin Name</Text>
<InputField
       style={styles.input}
       placeholder='Full name'
       placeholderTextColor={Colors.gray}
       value={name}
       onChangeText={setName}
       /> 
       <Ionicons name="person" size={20}  color={Colors.primary} style={styles.iconPlaceholder}  />
       {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

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
    onPress={handleRegister}>
    <Text style={styles.continueTxt} >Register</Text>
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
   left:5,
    fontSize:26,
    fontWeight:'bold',
    letterSpacing: 1.2,
    color: Colors.primary,
    marginBottom:40, 
    },
  description:{
   top:-25,
   left:-2,
   fontSize: 15.5,
   lineHeight:25,
  },
  inputField:{
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
           top:-38,
            right:-270,
          },
          password:{
           top:-38,
           right:-270,
          },
          iconPlaceholder:{
            top:-38,
            right:-270,
        },
          errorText: {
            color: 'red',
            marginBottom: 10,
            marginTop: -5,
            marginLeft: 10,
            fontSize: 13,
          },
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