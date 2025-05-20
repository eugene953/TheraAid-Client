import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { Stack } from 'expo-router';
import HeaderReminder from '@/components/Headers/HeaderReminder';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { API_URL } from '@/config';

type JWTPayload = {
  id: number;
  role: 'user' | 'admin';
};


const SetReminder = () => {
  const [title, setTitle] = useState('');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [reminderList, setReminderList] = useState<
    { day: number; time: Date }[]
  >([]);

  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);

  const auth = useSelector((state: RootState) => state.auth);

const [userId, setUserId] = useState<number | null>(null);
const [token, setToken] = useState<string | null>(null);

// Decode token to get userId and token
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


  const handleConfirm = (time: Date) => {
    if (selectedDay !== null) {
      setReminderList((prev) => [...prev, { day: selectedDay, time }]);
      setSelectedDay(null);
      hidePicker();
    } else {
      Alert.alert('Select a day first');
    }
  };

  const handleSetReminder = async () => {
  if (!title.trim()) {
    Alert.alert('Validation Error', 'Please enter a reminder title.');
    return;
  }

  if (reminderList.length === 0) {
    Alert.alert('Validation Error', 'Please add at least one day and time.');
    return;
  }

  if (!userId || !token) {
    Alert.alert('Authentication Error', 'You must be logged in to set a reminder.');
    return;
  }

  try {
    const remindersPayload = reminderList.map((reminder) => ({
      reminderDay: reminder.day.toString(), 
      reminderTime: reminder.time.toTimeString().split(' ')[0], 
    }));

    const payload = {
      userID: userId,
      activityType: title,
      reminders: remindersPayload,
    };

    console.log('Sending payload:', JSON.stringify(payload, null, 2));

    await axios.post(`${API_URL}/api/reminder`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    Alert.alert('Success', 'Reminders have been set successfully!');
    setTitle('');
    setReminderList([]);
  } catch (error: any) {
    console.error('Error setting reminder:', error.response?.data || error.message);
    Alert.alert(
      'Error',
      error.response?.data?.message || 'Failed to set reminders. Please try again.'
    );
  }
};

  

  const removeReminder = (index: number) => {
    setReminderList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Stack.Screen
        options={{ headerShown: true, header: () => <HeaderReminder /> }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

          <Text style={styles.label}>Reminder Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Take medication"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Select Day</Text>
          <View style={styles.daysContainer}>
            {DAYS.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayButton,
                  selectedDay === index && styles.dayButtonSelected,
                ]}
                onPress={() => setSelectedDay(index)}
              >
                <Text
                  style={[
                    styles.dayButtonText,
                    selectedDay === index && styles.dayButtonTextSelected,
                  ]}
                >
                  {day.substring(0, 3)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => {
              if (selectedDay === null) {
                Alert.alert('Please select a day first');
                return;
              }
              showPicker();
            }}
          >
            <Ionicons name="time-outline" size={20} color={Colors.gray} />
            <Text style={styles.timeButtonText}>Pick Time</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isPickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hidePicker}
          />

          {reminderList.length > 0 && (
            <View style={styles.reminderList}>
              <Text style={styles.label}>Added Reminders</Text>
              {reminderList.map((item, index) => (
                <View key={index} style={styles.reminderItem}>
                  <Text style={styles.reminderText}>
                    {DAYS[item.day]} -{' '}
                    {item.time.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                  <TouchableOpacity onPress={() => removeReminder(index)}>
                    <Ionicons name="trash" size={18} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.setButton} onPress={handleSetReminder}>
            <Text style={styles.setButtonText}>Set Reminder</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default SetReminder;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 60,
    backgroundColor: Colors.white,
  },
  container: {
    padding: 24,
  },
  
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#111',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    marginTop: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1.2,
    borderColor: '#d4d4d8',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#111',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    marginBottom: 8,
  },
  dayButtonSelected: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  dayButtonText: {
    color: '#333',
    fontSize: 14,
  },
  dayButtonTextSelected: {
    color: '#fff',
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 14,
    backgroundColor: '#f4f4f5',
    borderRadius: 16,
  },
  timeButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#111',
  },
  reminderList: {
    marginTop: 24,
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  reminderText: {
    fontSize: 15,
    color: '#333',
  },
  setButton: {
    backgroundColor: Colors.button,
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 32,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  setButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
