import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface ProgressBarProps {
    step: number;
    totalSteps?: number;
}

const ProgressBar = ({step, totalSteps = 3}: ProgressBarProps) => {

    const segments = Array.from({ length: totalSteps });

  return (
    <View style={styles.container}>
        {segments.map((_, index) => {
        const isActive = index < step;
      return (
      <View
      key={index}
      style={[
        styles.segment, 
        {  backgroundColor: isActive ? '#7e8cff' : '#e0e0e0'  }]} />
    )
})

}
      </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({

    container: {
       top: 40,
        flexDirection: 'row',
        width: '50%',
        height: 8,
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginBottom: 20,
      },
      segment: {
        flex: 1,
        height: '100%',
        marginHorizontal: 2,
        borderRadius: 20,
      },
    });
