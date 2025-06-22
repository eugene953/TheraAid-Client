
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const HeaderReminder = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
      <TouchableOpacity style={styles.arrow}
      onPress={() => router.back()}>
        <Ionicons name='arrow-back' size={24} color={Colors.primary} />
      </TouchableOpacity>
           
            <Text style={styles.header}>Reminders</Text>      
          
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
    arrow:{
        top:5,
        left:5,
        },
    logo: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    },
header:{
left: -100,
fontSize:23,
fontWeight:'bold',
},
headerIcon:{
flexDirection: 'row',
gap:10,
}


});

export default HeaderReminder;
