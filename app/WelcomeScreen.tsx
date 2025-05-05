import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native'
import { Stack } from 'expo-router'
import Animated, { FadeInRight } from 'react-native-reanimated'
import { Colors } from '@/constants/Colors'
import SocialLoginButton from '@/components/SocialLoginButton'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { Link } from 'expo-router'

const WelcomeScreen = () => {
  return (
    <>
    <Stack.Screen options={{headerShown: false}} />
        <ImageBackground source={require('../assets/images/Welcome.png')}
        style={{flex:1, width: '100%', height: '100%', position: 'absolute'}} 
        resizeMode='cover'> 

<View style={styles.container}>
  <View style={styles.wrapper}>
     <View style={styles.wrapperText}>
       <Animated.Text style={styles.title} entering={FadeInRight.delay(300).duration(300).springify()}>Welcome to </Animated.Text>
       <Animated.Text style={styles.title} entering={FadeInRight.delay(300).duration(300).springify()}>TheraAid👋</Animated.Text>
       </View> 

<View  style={styles.buttonContainer} >
<Link href={"/signin"} asChild>
   <TouchableOpacity style={ styles.login}>
        <Text style={styles.loginTxt}>Login</Text>
       </TouchableOpacity>
    </Link>

    <Link href={"/signup"} asChild>
    <TouchableOpacity style={styles.signUp}>
        <Text style={styles.signUpTxt}>Sign up</Text>
       </TouchableOpacity>
       </Link>
</View>
       
      <View  style={{top:170,  flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center', }}>
      <View style={styles.line} />
      <Text  style={{}}> or continue with</Text>
      <View style={styles.line} />
       </View>

       <View  style={{top:200, }}>
       <SocialLoginButton emailHref="/signup" />
       </View>

  </View>
</View>
    </ImageBackground>
    </>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
},
wrapper:{
  top: -40,
  paddingHorizontal:20,
  alignItems: 'center',
        },
wrapperText:{
   marginTop: 40
                  },
title:{
  fontSize: 35,
  fontWeight: 'bold',
  color: Colors.primary,
  letterSpacing: 2.4,
  marginBottom: 5,
       },
       buttonContainer:{
        top: 70,
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 20,
        alignItems: 'center',
      
        
    },
    button: {
        paddingHorizontal: 150,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        
      },
      login: {
        width: 300,
        paddingVertical: 15,
          borderRadius: 40,
        backgroundColor: '#7e8cff'
    
      },
      loginTxt: {
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold'
      },
      signUp: {
        backgroundColor: Colors.Secondary,
        width: 300,
        paddingVertical: 15,
          borderRadius: 40,
      },
      signUpTxt: {
        alignSelf: 'center',
         color: '#7e8cff',
        fontWeight: 'bold'
       
      },
      continue: {
        marginTop: 100,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
      },
      line: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'white',
        
      },
})