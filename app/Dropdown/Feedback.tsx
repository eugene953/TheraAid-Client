import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import HeaderFeedback from '@/components/Headers/HeaderFeedback';
import { Colors } from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { API_URL } from '@/config';

type JWTPayload = {
  id: number;
  role: 'user' | 'admin';
};

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

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


  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if ((!feedback.trim() && rating === 0) || !userId || !token) {
      Alert.alert('Empty Feedback', 'Please provide feedback or a rating.');
      return;
    }

    try{
      const response = await axios.post(`${API_URL}/api/feedback`,{ 
          user_id: userId,
          rating,
          message: feedback,
        },
       {
         headers:{
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
         },
      }
    );

    if (response.status >=200 && response.status < 300) {
    Alert.alert('Thank You', 'Your feedback has been submitted.');
    setFeedback('');
    setRating(0);
  } else {
    Alert.alert('Error', response.data.message || 'Failed to submit feedback.');
      }
    } catch (error: any) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.error(error.response?.data || error.message || error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <HeaderFeedback /> }} />

      <View style={styles.container}>
        <Text style={styles.title}>How was your experience?</Text>

        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <FontAwesome
                name={star <= rating ? 'star' : 'star-o'}
                size={32}
                color={Colors.highlight}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          multiline
          placeholder="Write your feedback here (in local dialect if you prefer)..."
          placeholderTextColor="#888"
          value={feedback}
          onChangeText={setFeedback}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    textAlignVertical: 'top',
    height: 150,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: Colors.button,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
