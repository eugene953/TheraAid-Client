// SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); 

const CustomSplash = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync(); 
      onFinish(); 
    }, 2000); 
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/splash-icon.png')} style={styles.image} />
      <Text style={styles.title}>TheraAid</Text>
      <ActivityIndicator size="large" color="#800080" style={styles.loader} />
    </View>
  );
};

export default CustomSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
  loader: {
    marginTop: 35,
  },
});
