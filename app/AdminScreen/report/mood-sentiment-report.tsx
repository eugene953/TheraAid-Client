import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import HeaderMoodSentimentReport from '@/components/Headers/HeaderMoodSentimentReport'; 


export default function mode_sentiment_report() {
  return (
     <>
       <Stack.Screen options={{ headerShown: true, header: () => <HeaderMoodSentimentReport /> }} />
         <View style={styles.container}>
      
      <Text>mode_sentiment_report</Text>

      </View>
    </>
  )
}

const styles = StyleSheet.create({

   container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 20,
  },
})