
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import axios from 'axios'
import { ProductType } from '@/types/type';
import { Stack } from 'expo-router';
import Header from '@/components/Header';
import { Colors } from '@/constants/Colors';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

type Props = {}

const ChatScreen = (props: Props) => {
  
    return (
        <>
        <Stack.Screen options={{headerShown: true,header: () => <Header/> }} />
        <View style={styles.container}>
            <Image source={require('../assets/images/ChatScreen.png')} style={styles.image} />
   
         <Text style={styles.description}>Capabilities</Text>  

<KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View >
         <TextInput 
         style={styles.searchBar}
         placeholder='Ask me anything...'
         placeholderTextColor='Colors.gray'
            />   

        <View style={styles.chat} >
        <TouchableOpacity
          style={styles.continue}
         //onPress={() => router.push('/signupTwo')}
         >
         <Ionicons name="mic" 
        size={24} 
        color="white"
        style={styles.voice} />
         </TouchableOpacity>

            <TouchableOpacity
          style={styles.continue}
         //onPress={() => router.push('/signupTwo')}
         >
          <Ionicons  
          name="send" size={24}
          color="white"
          style={styles.text} />
         </TouchableOpacity>
         </View>
         </View>
 </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

        </View>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       padding:10,
       backgroundColor: Colors.white,      
    },
    image:{
    top:40,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    },
 
       description:{
        top:30,
        left:-2,
        fontSize: 15.5,
        lineHeight:25,
        color: Colors.gray,
        margin:20,
        textAlign: 'center'
        
       },
       searchBar:{
        top: 150,
        left: -30,
      backgroundColor: Colors.background,
      borderRadius:5,
      paddingVertical: 20,
      paddingHorizontal: 80,
      flexDirection: 'row',
      justifyContent:'space-between',
    
    },
  
    chat: {
       flexDirection: 'row',
       gap: 20,
       top: 95,
       left: 180,
       
      },
       voice: {
        margin: 13,
      
      },
      text: {
        margin: 13,
          transform: [{ rotate: '-45deg' }],
      },
      continue: {
        backgroundColor: '#7e8cff',
        padding:1,
        borderRadius: 50,    
         
      },
});

export default ChatScreen;
