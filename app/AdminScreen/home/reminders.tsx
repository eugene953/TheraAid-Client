import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import AdminReminderHeader from '@/components/Headers/HeaderReminder';
import axios from 'axios';
import { API_URL } from '@/config';

interface ReminderItem {
  username: string;
  activitytype: string;
  reminderday: number;
  remindertime: string;
}

const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Reminders() {
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/getUserReminder`);
        setReminders(response.data);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  const renderItem = ({ item }: { item: ReminderItem }) => (
    <View style={styles.card}>
      <Text style={styles.username}>👤 {item.username}</Text>
      <Text style={styles.activity}>📝 {item.activitytype}</Text>
      <Text style={styles.time}>
        📅 {dayMap[item.reminderday]} at 🕒 {item.remindertime.slice(0, 5)}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#7e8cff" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <AdminReminderHeader /> }} />
      <View style={styles.container}>
        <FlatList
          data={reminders}
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
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#e9efff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  activity: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  time: {
    fontSize: 13,
    marginTop: 6,
    color: '#555',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
