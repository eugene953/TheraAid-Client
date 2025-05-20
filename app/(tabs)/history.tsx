import HeaderHistory from '@/components/Headers/HeaderHistory';
import { Colors } from '@/constants/Colors';
import { router, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { RootState } from '@/redux/store';
import { API_URL } from '@/config';
import { history } from '@/types/type';

type JWTPayload = {
  id: number;
  role: 'user' | 'admin';
};


const History = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [sessions, setSessions] = useState<history[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (!auth.token) {
          Alert.alert('Not authenticated. Please log in.');
          return;
        }

        const decoded = jwtDecode<JWTPayload>(auth.token);
        const userId = decoded.id;

        const response = await axios.get(`${API_URL}/chat/history/${userId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        setSessions(response.data.sessions);
      } catch (error) {
        console.error('Error fetching history:', error);
        Alert.alert('Failed to load chat history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [auth.token]);

  const renderItem = ({ item }: { item: history }) => (
    <TouchableOpacity style={styles.card} 
    onPress={() => router.push({
      pathname: '/ChatScreen',
      params: { session_id: item.session_id.toString() },
    })}>
      <Text style={styles.message} numberOfLines={1}>
        {item.message || 'Chat session'}
      </Text>
      <Text style={styles.date}>
        {new Date(item.date).toLocaleDateString()} • {new Date(item.start_time).toLocaleTimeString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <HeaderHistory /> }} />
      <View style={styles.container}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : sessions.length > 0 ? (
          <FlatList
            data={sessions}
            keyExtractor={(item, index) => `${item.session_id}-${index}`}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <Text style={styles.noHistoryText}>No chat history found.</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    top:20,
   
  },
  card: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  date: {
    fontSize: 12,
    color: '#7D7D7D',
    marginTop: 4,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  noHistoryText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
  },
});

export default History;
