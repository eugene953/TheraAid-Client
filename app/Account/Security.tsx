import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const Security = () => {
  return (
    <View>
      <Text>Security</Text>
    </View>
  )
}

export default Security

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
     padding:20,
     backgroundColor: Colors.white,
    },
});