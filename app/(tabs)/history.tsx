import HeaderHistory from '@/components/HeaderHistory';
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

const history = () => {
  return (

    <>
    <Stack.Screen options={{headerShown: true,header: () => <HeaderHistory/> }} />
    <View style={styles.container}>
        <Text>Hello My Chat History</Text>  
    
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
});

export default history;
