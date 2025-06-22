import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import { Stack } from 'expo-router';
import HeaderNotifications from '@/components/Headers/HeaderNotifications';
import { Colors } from '@/constants/Colors';
import { RootState } from '@/redux/store';
import { SOCKET_URL } from '@/config';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import {
  addMessage,
  markAllAsRead,
  removeMessage,
} from '@/redux/slices/notificationsSlice';
import { useFocusEffect } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';

type JWTPayload = {
  id: number;
  role: 'user' | 'admin';
};

const NotificationsScreen = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.notifications.messages);

  useFocusEffect(
    useCallback(() => {
      dispatch(markAllAsRead());
    }, [dispatch])
  );

  useEffect(() => {
    if (auth.token) {
      try {
        const decoded = jwtDecode<JWTPayload>(auth.token);
        setUserId(decoded.id);
        setToken(auth.token);
      } catch (error) {
        Alert.alert('Error', 'Invalid session. Please login again.');
      }
    }
  }, [auth.token]);

  useEffect(() => {
  if (!userId || !token) return;

  const socketUrl = `ws://${SOCKET_URL}?userID=${userId}&token=${token}`;
  console.log('🔌 Connecting to:', socketUrl);

  const socket = new WebSocket(socketUrl);

  socket.onopen = () => {
    console.log('✅ WebSocket connected');
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      if (data.type === 'notification' && data.payload) {
        const { activityType, dayName, reminderTime, title, body } = data.payload;

          dispatch(addMessage(data.payload));
       

        Alert.alert(
          title || '🔔 Notification',
         body || 'You have a new message.');
      }
    } catch (err) {
      console.error('❌ Failed to parse message:', err);
    }
  };

  socket.onerror = (err) => {
    console.error('❌ WebSocket error:', err);
  };

  socket.onclose = () => {
    console.log('🔌 WebSocket disconnected');
  };

  return () => {
    socket.close();
  };
}, [userId, token]);


  const handleDelete = (index: number) => {
    dispatch(removeMessage(index));
  };

  // Render right swipe actions (Delete button)
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>, 
    dragX: Animated.AnimatedInterpolation<number>, index: number) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={() => handleDelete(index)}
        style={styles.deleteButton}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons name="trash-outline" size={30} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
  <Swipeable
    renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, index)}
  >
    <View style={styles.messageRow}>
      <View style={styles.messageContent}>
        <Text style={styles.activityType}>{item.title || '🔔 Notification'}</Text>
        <Text style={styles.metaLine}>{item.body}</Text>
        {(item.dayName || item.reminderTime) && (
          <View style={styles.metaRow}>
          </View>
        )}
      </View>
    </View>
  </Swipeable>
);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <HeaderNotifications />, }} />
      <View style={styles.container}>
        {messages.length === 0 ? (
          <Text style={styles.placeholder}>No Notifications yet</Text>
        ) : (
          <FlatList
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 16,
    backgroundColor: Colors.white,
  },
  placeholder: {
    alignItems: 'center',
    padding: 50,
    fontSize: 16,
    color: 'gray',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingRight: 16,
    backgroundColor: Colors.white,
  },
  messageContent: {
    flex: 1,
    flexDirection: 'column',
  },
  activityType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
  },
  metaLine: {
    fontSize: 14,
    color: '#555',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
  },
});

export default NotificationsScreen;
