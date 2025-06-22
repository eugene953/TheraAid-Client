import { Ionicons } from "@expo/vector-icons";
import {  StyleSheet } from "react-native";

 export const Icon = {
    homeScreen: ({ color}: { color: string}) => (
      <Ionicons name='chatbubble-ellipses-outline' size={22} color={color}/>
    ),
    history : ({ color}: { color: string}) => (
      <Ionicons name="time-outline" size={22} color={color}/>
    ),
    notifications : ({ color}: { color: string}) => (
       <Ionicons name='notifications-outline' size={22} color={color}/>
     ),
    account : ({ color}: { color: string}) => (
       <Ionicons name='person-outline' size={22} color={color}/>
      ),

      // admin icon
      home: ({ color }: { color: string }) => (
        <Ionicons name="home-outline" size={22} color={color} />
      ),
      report: ({ color }: { color: string }) => (
        <Ionicons name="bar-chart-outline" size={22} color={color} />
      ),
      settings: ({ color }: { color: string }) => (
        <Ionicons name="settings-outline" size={22} color={color} />
      ),
   
}

const style = StyleSheet.create({
userImg: {
    height: 24,
    width: 24,
    borderRadius: 20,

}
})