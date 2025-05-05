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

const OnboardingTwo= () => {

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
         source={require('../assets/images/Onboarding-2.png')}
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
            <Animated.Text style={styles.title} entering={FadeInRight.delay(300).duration(300).springify()}>Talk in Your Dialect</Animated.Text>
            <Animated.Text style={styles.description} entering={FadeInRight.delay(500).duration(300)}>Chat with the bot in your dialect for more personalized expirience.</Animated.Text>
            </View>  

          {/* Progress bar */}
          <ProgressBar step={2} />

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
          onPress={() => router.push('/OnboardingThree')}
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
      fontSize: 26,
      fontWeight: 'bold',
      color: Colors.primary,
      letterSpacing: 2.4,
      marginBottom: 5,
           },
    description: {
      fontSize: 14,
      letterSpacing:1.2,
      lineHeight:35,
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
      progressBarContainer: {
        height: 8,
        width: '80%',
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        marginBottom: 20,
        overflow: 'hidden',
      },
      
      progressBar: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 4,
      },
      
   
});

export default OnboardingTwo;
