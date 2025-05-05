
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const HeaderAccount = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
          <Image source={require('../assets/images/splash-icon.png')} style={styles.logo} /> 
           
            <Text style={styles.header}>Account</Text>
                
          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       paddingHorizontal: 10,
       top: 20,
       backgroundColor: Colors.white,
    },
    logo: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    },
header:{
left: -120,
fontSize:23,
fontWeight:'bold',
},


});

//make this component available to the app
export default HeaderAccount;
