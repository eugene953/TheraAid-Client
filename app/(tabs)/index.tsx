
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios'
import { ProductType } from '@/types/type';
import { Stack } from 'expo-router';
import Header from '@/components/Header';
import { Colors } from '@/constants/Colors';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { router } from 'expo-router';

type Props = {}

const HomeScreen = (props: Props) => {
  

    return (
        <>
        <Stack.Screen options={{headerShown: true,header: () => <Header/> }} />
        <View style={styles.container}>
            <Image source={require('../../assets/images/splash-icon.png')} style={styles.image} />
    
     <View style={styles.wrapper}>
     <View style={styles.wrapperText}>
       <Animated.Text style={styles.title} entering={FadeInRight.delay(300).duration(300).springify()}>Welcome to </Animated.Text>
       <Animated.Text style={styles.title} entering={FadeInRight.delay(300).duration(300).springify()}>TheraAid👋</Animated.Text>
       </View>

         <Text style={styles.description}>Start chatting with ChattyAI now. You can ask me anything.</Text>
         </View>
         <TouchableOpacity
    style={styles.continue}
    onPress={() => router.push('/ChatScreen')}
    >
    <Text style={styles.continueTxt} >Start Chat</Text>
   
       </TouchableOpacity>
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
       top:20,
       
    },
    image:{
    top:10,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    },
    wrapper:{
        paddingHorizontal:20,
        alignItems: 'center',
        margin:10,
        top:30,
            },
    wrapperText:{
    marginVertical:15,
                        },
      title:{
        fontSize: 35,
        fontWeight: 'bold',
        color: Colors.primary,
        letterSpacing: 2.4,
        marginBottom: 5,
      },
 
       description:{
        left:-2,
        fontSize: 15.5,
        lineHeight:25,
        color: Colors.gray,
        margin:20,
        textAlign: 'center'
        
       },
       continue: {
        marginTop: 60,
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

export default HomeScreen;
