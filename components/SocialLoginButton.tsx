//import liraries
import { Colors } from '@/constants/Colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {Href, Link } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

type Props = {
    emailHref: Href
}

// create a component
const SocialLoginButton = (props: Props) => {
    const {emailHref} = props;
    
    return (
        <View style={styles.socialLoginWrapper}>
            <View style={styles.buttonWrapper}>
        <Animated.View  entering={FadeInDown.delay(500).duration(500).springify()}>
        <Link href={emailHref} asChild>
        <TouchableOpacity style={styles.button}>
        <Image source={require('../assets/images/google-logo2.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
        </Link>
        </Animated.View>

        <Animated.View  entering={FadeInDown.delay(700).duration(500)}>
        <TouchableOpacity style={styles.button}>
        <Ionicons name='logo-apple' size={25} color={Colors.primary} />
        </TouchableOpacity>
        </Animated.View>

       
        <Animated.View  entering={FadeInDown.delay(1100).duration(500)}>
        <TouchableOpacity style={styles.button}>
        <Image source={require('../assets/images/facebook-logo.png')} style={{ width: 25, height: 25, resizeMode:'contain' }} />
        </TouchableOpacity>
        </Animated.View>

        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    socialLoginWrapper:{
        alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'center',
            },
    buttonWrapper:{
                flexDirection: 'row', 
                justifyContent: 'space-between',
                gap: 16,
              
            },
    button:{
        padding: 12,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100, 
        height: 50,
        borderWidth: 1, 
        borderColor: Colors.background,
        backgroundColor:Colors.white,
            },
    
});

export default SocialLoginButton;
