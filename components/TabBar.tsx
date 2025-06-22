import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View,  StyleSheet} from 'react-native';

import TabBarButton from './TabBarButton';
import { Icon } from '@/constants/Icon';
import { Colors } from '@/constants/Colors';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';


export function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {

  const notificationCount = useSelector(
    (state: RootState) => state.notifications.messages.length
  );

  const hasUnread = useSelector(
    (state: RootState) => state.notifications.hasUnread
  );

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

            const showBadge = route.name === 'notifications' && hasUnread;
    
        return (
          <View key={route.name} style={{ position: 'relative', flex: 1 }}>
          <TabBarButton
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name as keyof typeof Icon}
            label={label as string}
          />
          {showBadge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {notificationCount > 9 ? '9+' : notificationCount}
              </Text>
            </View>
          )}
        </View>
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
     height: 60,
     borderTopWidth: 1,
     borderTopColor: '#ddd',
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 25,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

