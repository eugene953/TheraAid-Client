import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import store from '@/redux/store';

import { useColorScheme } from '@/hooks/useColorScheme';
import CustomSplash from './SplashScreen';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
  useEffect(() => {
    if (fontsLoaded) {

      const timeout = setTimeout(() => {
        setAppReady(true);
      SplashScreen.hideAsync();
    } , 2000);
    return () => clearTimeout(timeout);
  }
  
}, [fontsLoaded]);

  if (!appReady) {
    return <CustomSplash onFinish={() => setAppReady(true)} />;
  }

  return (
   <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="OnboardingOne" options={{ presentation: 'modal' }} />
        <Stack.Screen name="OnboardingTwo" options={{ presentation: 'modal' }} />
        <Stack.Screen name="OnboardingThree" options={{ presentation: 'modal' }} />
        <Stack.Screen name="WelcomeScreen" options={{ presentation: 'modal' }} />
        <Stack.Screen name="Signup" options={{presentation: 'modal' }} />
        <Stack.Screen name="SignupTwo" options={{presentation: 'modal' }} />
        <Stack.Screen name="Signin" options={{ presentation: 'modal' }} />
        <Stack.Screen name="ResetPassword" options={{ presentation: 'modal' }} />
        <Stack.Screen name="OTP" options={{ presentation: 'modal' }} />
        <Stack.Screen name="ChatScreen" options={{ presentation: 'modal' }} />
        <Stack.Screen name="PersonInfo" options={{ presentation: 'modal' }} />
        <Stack.Screen name="Security" options={{ presentation: 'modal' }} />
        <Stack.Screen name="Feedback" options={{ presentation: 'modal' }} />
        <Stack.Screen name="HelpCenter" options={{ presentation: 'modal' }} />
        <Stack.Screen name="Payment" options={{ presentation: 'modal' }} />
        <Stack.Screen name="PrivacyPolicy" options={{ presentation: 'modal' }} />
        <Stack.Screen name="About" options={{ presentation: 'modal' }} />
        <Stack.Screen name="Logout" options={{ presentation: 'modal' }} />
      </Stack>
     </Provider>
     
  );
}
