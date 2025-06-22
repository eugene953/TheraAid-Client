import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/config';
import { Stack } from 'expo-router';
import HeaderFeedback from '@/components/Headers/HeaderFeedback';


interface FeedbackItem {
  username: string;
  rating: number;
  message: string | null;
}

export default function Feedback() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/getUserFeedback`);
        setFeedbackList(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const renderItem = ({ item }: { item: FeedbackItem }) => (
    <View style={styles.card}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.rating}>⭐ Rating: {item.rating}</Text>
      {item.message && <Text style={styles.message}>“{item.message}”</Text>}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#7e8cff" style={styles.loading} />;
  }

  return (

    <>
      <Stack.Screen options={{ headerShown: true, header: () => <HeaderFeedback /> }} />
  
    <View style={styles.container}>
      <FlatList
        data={feedbackList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 18,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#f0f2ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  rating: {
    fontSize: 14,
    color: '#555',
  },
  message: {
    marginTop: 5,
    fontStyle: 'italic',
    color: '#444',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
