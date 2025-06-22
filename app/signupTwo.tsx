
import InputField from '@/components/InputField';
import { Colors } from '@/constants/Colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearSignup, setSignupStepTwo } from '@/redux/slices/signupSlice';
import axios from 'axios';
import { login } from '@/redux/slices/loginSlice';
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from '@/config';
import { jwtDecode } from 'jwt-decode';
import SignupSuccessModal from '@/components/Modal/SignupSuccessModal';


const SignupTwo = () => {

  const dispatch = useDispatch();
  const { email, password } = useSelector((state: RootState) => state.signup);
  
  const [username, setUsername] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const [isModalVisible, setModalVisible] = useState(false);

  const [errors, setErrors] = useState({ username: '',phone_number : '', gender: '' });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0]);
    }
  };


  const validate = () => {
    let newErrors = { username: '', phone_number: '', gender: '' };
    let hasError = false;

    if (!username.trim()) {
      newErrors.username = 'Full name is required';
      hasError = true;
    }

    const phoneRegex = /^[0-9]{9,15}$/;
    if (!phone_number.trim() || !phoneRegex.test(phone_number)) {
      newErrors.phone_number = 'Enter a valid phone number';
      hasError = true;
    }

    if (!selectedGender) {
      newErrors.gender = 'Please select your gender';
      hasError = true;
    }

    setErrors(newErrors);
    return hasError;
  };

  const handleContinue = async () => {
    if (validate()) return;

    setIsLoading(true);
    try {
      dispatch(setSignupStepTwo({ username, phone_number, gender: selectedGender }));

      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('username', username);
      formData.append('gender', selectedGender);
      formData.append('phone_number', phone_number);

      if (profileImage) {
        formData.append('profile', {
          uri: profileImage.uri,
          type:'image/jpeg',
          name: `profile_${Date.now()}.jpg`,
        }  as unknown as Blob); 
      }

      const response = await axios.post(`${API_URL}/api/users/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setModalVisible(true);


      const { token } = response.data;
      const decoded: any = jwtDecode(token); // decode JWT payload
      dispatch(login({ 
        user_id: decoded.user_id,
        role: decoded.role,
        email: decoded.email, 
        token,
      }));
    
    
    } catch(err) {
      if (axios.isAxiosError(err)) {
        console.error('Axios Error: ', err.message);
        alert('Network Error: Please check your internet connection or try again later.');
      } else {
        console.error('Error: ', err);
        alert('Registration failed, please try again');
      }
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <>
    <Stack.Screen options={{headerShown: false,}}  />
     <TouchableOpacity style={styles.arrow}
      onPress={() => router.back()}>
        <Ionicons name='arrow-back' size={24} color={Colors.primary} />
      </TouchableOpacity>
    
    <View style={styles.container}>
       <Text style={styles.title}>Complete your profile </Text>
         <Text style={styles.description}>Please enter your profile. Don't worry, only you can see your personal data. No one else will be able to see it. Or you can skip it for now.</Text>
 
<TouchableOpacity onPress={pickImage} >

{!profileImage ? (
  <FontAwesome name='user' size={60} color={Colors.gray} style={styles.iconContainer}  />
 ) : ( <Image
    source={{ uri: profileImage.uri }}
    style={{ width: 100, height: 100, borderRadius: 50, marginBottom:30, }}
  />
)}
</TouchableOpacity>


 <View style={styles.inputField}>

 <InputField
       style={styles.input}
       placeholder='Full name'
       placeholderTextColor={Colors.gray}
       value={username}
       onChangeText={setUsername}
       /> 
       <Ionicons name="person" size={20}  color={Colors.gray} style={styles.iconPlaceholder}  />
       {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

<Text style={styles.label}>Phone number</Text>
       <InputField
       style={styles.input}
       placeholder='Phone number'
       placeholderTextColor={Colors.gray}
       keyboardType="phone-pad"
       autoCapitalize="none"
       value={phone_number}
      onChangeText={setPhone_number}
       /> 
        <Ionicons name="call" size={20}  color={Colors.gray} style={styles.phone}  /> 
        {errors.phone_number ? <Text style={styles.errorText}>{errors.phone_number}</Text> : null}

<Text style={styles.label}>Gender</Text>
<View style={styles.input}>
<Picker
    selectedValue={selectedGender}
    onValueChange={setSelectedGender}
    style={{ color: Colors.primary }} 
    dropdownIconColor={Colors.gray} 
  >
    <Picker.Item label="Select Gender" value="" color={Colors.gray} />
    <Picker.Item label="Male" value="male" />
    <Picker.Item label="Female" value="female" />
    <Picker.Item label="Other" value="other" />
  </Picker>
       </View>
       {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}

       </View>

    <TouchableOpacity style={styles.continue}
        onPress={handleContinue}
    >
        <Text style={styles.continueTxt}>
        {isLoading ? 'Registering...' : 'Register'}
        </Text>
       </TouchableOpacity>
       
       <SignupSuccessModal
      visible={isModalVisible}
      onClose={() => {
      setModalVisible(false);
      dispatch(clearSignup());
      router.replace('/signin'); 
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
   top:5,
   left:-18,
    fontSize:26,
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
     
        iconContainer: {
          width: 90,
          height: 90,
          borderRadius: 50,
          backgroundColor: '#f0f0f0',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          marginBottom: 20,
          padding:20,
        },
        iconPlaceholder:{
            top:-45,
            right:-270,
        },
          label: {
            fontSize: 16,
            color: Colors.primary,
            marginBottom: 4,
            fontWeight: 'bold',
            left:-10,
          },
          input: {
            borderRadius: 50,
            height: 50,
            backgroundColor: Colors.lightGray,
            paddingHorizontal: 15,
            left: -6,
          },
          phone:{
            top:-40,
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
      color: Colors.primary,
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

export default SignupTwo;
