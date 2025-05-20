import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { Stack } from 'expo-router';
import HeaderNotifications from '@/components/Headers/HeaderNotifications';
import { Colors } from '@/constants/Colors';
import { RootState } from '@/redux/store';
import { SOCKET_URL } from '@/config';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import { Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addMessage, removeMessage } from '@/redux/slices/notificationsSlice';

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
        if (data.type === 'reminder' && data.payload) {
          dispatch(addMessage(data.payload));
          const { activityType, dayName, reminderTime } = data.payload;
          Alert.alert('🔔 Reminder', `${activityType}\n${dayName}\n${reminderTime}`);
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

  return (
    <>
      <Stack.Screen options={{  headerShown: true, header: () => <HeaderNotifications />, }}
/>
      <View style={styles.container}>
        {messages.length === 0 ? (
          <Text style={styles.placeholder}>No reminders yet</Text>
        ) : (
          <FlatList
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
             <View style={styles.messageRow}>
           <View style={styles.messageContent}>
           <Text style={styles.activityType}>{item.activityType}</Text>
           <View style={styles.metaRow}>
              <Text style={styles.metaLine}>
              {item.dayName} · {item.reminderTime}
              </Text>
           </View>
           </View>
    
            <Ionicons
              name="trash-outline"
              size={24}
              color="red"
              onPress={() => handleDelete(index)}
              style={styles.trashIcon}
            />
          </View>
        )}
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
    alignItems:'center',
   padding: 50,
    fontSize: 16,
    color: 'gray',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: 8,
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
  trashIcon: {
    marginLeft: 10,
  },
});

export default NotificationsScreen;
