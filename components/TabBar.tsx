import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, LayoutChangeEvent } from 'react-native';

import TabBarButton from './TabBarButton';
import { Icon } from '@/constants/Icon';
import { Colors } from '@/constants/Colors';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


export function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {



  return (
    <View style={styles.tabbar}>

         
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const rawLabel = options.tabBarLabel ?? options.title ?? route.name;
        const label = typeof rawLabel === 'function' ? route.name : rawLabel;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

            // Ensure routeName exists in Icon
            const iconKeys = Object.keys(Icon);
            if (!iconKeys.includes(route.name)) {
              console.warn(`No icon found for route "${route.name}". Skipping tab.`);
              return null;
            }
    
        return (
          <TabBarButton
          key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name as keyof typeof Icon}
            label={label}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
     backgroundColor: Colors.white,

  },
});

