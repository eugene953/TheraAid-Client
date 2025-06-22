
import { MyTabBar } from '@/components/TabBar';
import { Tabs } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
export default function TabLayout() {


  return (
     <GestureHandlerRootView style={styles.container}>
    <Tabs  screenOptions={{ headerShown: false}}
    tabBar={(props) => <MyTabBar {...props} />}
     >
      <Tabs.Screen name="homeScreen" options={{
          title: 'Chat',
        // tabBarIcon: ({ color }) => (
        //   <Ionicons name='time-outline' size={22} color={color}/>
        //  )
        }}/>
        
           <Tabs.Screen name="history" options={{
          title: 'History',
         // tabBarIcon: ({ color }) => (
         //   <Ionicons name='chatbubble-ellipses-outline' size={22} color={color}/>  
        // ) 
        }}/>

         <Tabs.Screen name="notifications" options={{
          title: 'Notifications',
         // tabBarIcon: ({ color }) => (
         // <Ionicons name='search-outline' size={22} color={color}/>  
       //  ) 
        }}/>

        <Tabs.Screen name="account"  options={{
          title: 'Account',
         // tabBarIcon: ({ color }) => (
      //    <Ionicons name="person-outline" size={22} color={color} />
      //   ),
        }} />
   
   </Tabs>  
   </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});