import { Link, Stack } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Button, Pressable } from 'react-native';
import { Colors } from '../constants/Colors';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import SocialLoginButton from '@/components/SocialLoginButton';
import { useRouter } from 'expo-router';
import ProgressBar from '@/components/ProgressBar';


type Props = {}

const OnboardingThree = () => {

    const router = useRouter();

    return (
        <>
        <Stack.Screen options={{headerShown: false}} />
        <ImageBackground source={require('../assets/images/Gradiant.png')}
        style={{flex:1, width: '100%', height: '100%', position: 'absolute'}} 
        resizeMode='cover'> 
        <Image
         source={require('../assets/images/Artboard.png')}
         style={{flex:1, width: '150%', height: '150%', position: 'absolute', top: -110  }} 
         resizeMode='cover'
         />
          <Image
         source={require('../assets/images/Onboarding-3.png')}
         style={{flex:1, width: 250, height: '30%', position: 'relative', left:110, marginTop: 90, borderRadius: 10 }} 
     resizeMode='cover'
         />
      
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LinearGradient
          colors={["transparent", "rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 1)"]} 
          style={styles.background}
        >
            <View style={styles.wrapper}>
                <View style={styles.wrapperText}>
            <Animated.Text style={styles.title} entering={FadeInRight.delay(300).duration(300).springify()}>Confidential and Secure</Animated.Text>
            <Animated.Text style={styles.description} entering={FadeInRight.delay(500).duration(300)}>Your conversations are private and securely stored.</Animated.Text>
            </View> 

          {/* Progress bar */}
          <ProgressBar step={3} /> 

         <View style={styles.buttonContainer}>
           <Pressable 
            style={[styles.button, styles.skipBtn]}
           onPress={() => console.log('Skip pressed')}
           >
           <Text style={styles.buttonText}
                onPress={() => router.push('/WelcomeScreen')}>Skip</Text>
           </Pressable>
    
          <Pressable 
          
          style={[styles.button, styles.nextBtn]}
          onPress={() => router.push('/WelcomeScreen')}
            >
          <Text style={styles.buttonTextTwo}>Next</Text>
         </Pressable>
     </View>
            </View>
            </LinearGradient>
        </View>
        </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',  
    },
    background:{
      flex:1,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent:'flex-end',
                },
    wrapper:{
      top: -85,
      paddingHorizontal:20,
      alignItems: 'center',
            },
    wrapperText:{
       marginTop: 40
                      },
    title:{
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.primary,
      letterSpacing: 2.4,
      marginBottom: 5,
           },
    description: {
      fontSize: 15,
      letterSpacing:1.2,
      lineHeight:30,
      marginBottom: 20,
      textAlign: 'center',
      alignSelf: 'center'
                 },
    buttonContainer:{
        top: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20
        
    },
    button: {
        padding: 20,
        borderRadius: 8,
        minWidth: 150,
        alignItems: 'center',
        
      },
      skipBtn: {
        backgroundColor: Colors.lightGray,
        borderRadius: 40
      },
      buttonText: {
        color: '#7e8cff',
        fontWeight: 'bold'
      },
      nextBtn: {
        borderRadius: 40,
        backgroundColor: '#7e8cff'
      },
      buttonTextTwo: {
        color: 'white',
        fontWeight: 'bold'
      },


   
});

export default OnboardingThree;
