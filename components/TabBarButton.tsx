import { Colors } from '@/constants/Colors';
import { Icon } from '@/constants/Icon';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, GestureResponderEvent } from 'react-native';

type RouteName = keyof typeof Icon;

type Props = {
    onPress: (event: GestureResponderEvent) => void;
    onLongPress: (event: GestureResponderEvent) => void;
    isFocused: boolean,
    label: string,
    routeName: RouteName,
};

const TabBarButton = (props: Props) => {
   const {onPress, onLongPress, isFocused, label, routeName,} = props;
   
   const color = isFocused ? "#7e8cff" : Colors.primary ;

   return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarBtn}
          >
            
         {Icon[routeName]({ color })}
      <Text style={{ color, fontSize: 12 }}>
        {label}
      </Text>

          </Pressable>
    );
};

const styles = StyleSheet.create({
    tabbarBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       gap: 5,
    },
   
});

export default TabBarButton;
