import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const InputField = (props: React.ComponentProps<typeof TextInput>) => {
  return (
    <View>
      <TextInput
 style={styles.inputField} 
 {...props}
 />
    </View>
  )
}

export default InputField

const styles = StyleSheet.create({
    inputField:{
        backgroundColor: Colors.white,
        paddingVertical: 12,
        paddingHorizontal: 18,
        alignSelf:'stretch',
        borderRadius:5,
        fontSize: 16,
        color: Colors.primary,
        marginBottom:20 
            },

})