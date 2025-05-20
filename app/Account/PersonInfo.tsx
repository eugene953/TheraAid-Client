import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from '@/config';
import InputField from '@/components/InputField';
import { jwtDecode } from 'jwt-decode';
import { UserProps } from '@/types/type';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import HeaderPersonaInfo from '@/components/Headers/HeaderPersonInfo';
import { Stack } from 'expo-router';



type JWTPayload = {
  id: number;
  role: 'user' | 'admin';
};

const PersonInfo = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // Editable form fields
  const [username, setUsername] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [profileImage, setProfileImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const [saving, setSaving] = useState(false);

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

  // Fetch user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId || !token) return;
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setUsername(response.data.username || '');
        setPhoneNumber(response.data.phone_number || '');
        setSelectedGender(response.data.gender || '');
        if (response.data.profile) {
          setProfileImage({ uri: response.data.profile } as any);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load user info.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId, token]);

  // Image picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0]);
    }
  };

  // Validate inputs before saving
  const validate = () => {
    if (!username.trim()) {
      Alert.alert('Validation Error', 'Please enter your full name.');
      return false;
    }
    const phoneRegex = /^[0-9]{9,15}$/;
    if (!phone_number.trim() || !phoneRegex.test(phone_number)) {
      Alert.alert('Validation Error', 'Please enter a valid phone number.');
      return false;
    }
    if (!selectedGender) {
      Alert.alert('Validation Error', 'Please select your gender.');
      return false;
    }
    return true;
  };

  // Handle save profile
  const saveProfile = async () => {
    if (!validate()) return;
    if (!token) return;

    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('phone_number', phone_number);
      formData.append('gender', selectedGender);

      if (profileImage && 'uri' in profileImage) {
        formData.append('profile', {
          uri: profileImage.uri,
          type: 'image/jpeg',
          name: `profile_${Date.now()}.jpg`,
        } as any);
      }

      await axios.patch(`${API_URL}/user/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refresh user info on success
      Alert.alert('Success', 'Profile updated successfully!');
      setEditMode(false);

      // Refresh user data
      const refreshedUser = await axios.get(`${API_URL}/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(refreshedUser.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#7e8cff" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text>User not found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <HeaderPersonaInfo /> }} />
      <ScrollView contentContainerStyle={styles.container}>
        {!editMode ? (
          <>
           {user.profile ? (
  <Image source={{ uri: user.profile }} style={styles.profileImage} />
) : (
  <View style={[styles.profileImage, styles.iconPlaceholder]}>
    <Ionicons name="person" size={60} color={Colors.gray} />
  </View>
)}

<Text style={styles.label}>Full Name</Text>
<View style={styles.readOnlyField}>
  <Text style={styles.readOnlyText}>{user.username}</Text>
</View>

<Text style={styles.label}>Email</Text>
<View style={styles.readOnlyField}>
  <Text style={styles.readOnlyText}>{user.email}</Text>
</View>

<Text style={styles.label}>Phone Number</Text>
<View style={styles.readOnlyField}>
  <Text style={styles.readOnlyText}>{user.phone_number || '-'}</Text>
</View>

<Text style={styles.label}>Gender</Text>
<View style={styles.readOnlyField}>
  <Text style={styles.readOnlyText}>{user.gender || '-'}</Text>
</View>

<TouchableOpacity style={styles.editButton} onPress={() => setEditMode(true)}>
  <Text style={styles.editButtonText}>Edit Profile</Text>
</TouchableOpacity>

          </>
        ) : (
          <>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {profileImage ? (
                <Image source={{ uri: profileImage.uri }} style={styles.profileImage} />
              ) : (
                <View style={[styles.profileImage, styles.imagePlaceholder]}>
                  <Text style={{ color: '#888' }}>Select Image</Text>
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.label}>Full Name</Text>
            <InputField
              value={username}
              onChangeText={setUsername}
              placeholder="Full Name"
              style={styles.input}
            />

            <Text style={styles.label}>Phone Number</Text>
            <InputField
              value={phone_number}
              onChangeText={setPhoneNumber}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              style={styles.input}
            />

            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedGender}
                onValueChange={setSelectedGender}
                style={{ color: '#333' }}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>

            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setUsername(user.username || '');
                  setPhoneNumber(user.phone_number || '');
                  setSelectedGender(user.gender || '');
                  setProfileImage(user.profile ? { uri: user.profile } as any : null);
                  setEditMode(false);
                }}
                disabled={saving}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={saveProfile}
                disabled={saving}
              >
                <Text style={styles.buttonText}>{saving ? 'Saving...' : 'Save'}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default PersonInfo;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 40,
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fb',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#e0e7ff',
    backgroundColor: '#dfe3ee',
  },
  imagePicker: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6eaf0',
  },
  iconPlaceholder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6eaf0',
  },
  label: {
    fontWeight: '600',
    color: '#555',
    fontSize: 14,
    marginBottom: 6,
    marginTop: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  

  editButton: {
    backgroundColor: '#7e8cff',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 30,
    width: '70%',
    alignSelf: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16.5,
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1.2,
    borderColor: '#d4d4d8',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 18,
    backgroundColor: '#fff',
    color: '#111',
  },
  pickerContainer: {
    borderWidth: 1.2,
    borderColor: '#d4d4d8',
    borderRadius: 16,
    backgroundColor: '#fff',
    marginBottom: 24,
    overflow: 'hidden',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flex: 0.48,
    paddingVertical: 14,
    borderRadius: 30,
  },
  cancelButton: {
    backgroundColor:Colors.gray,
  },
  saveButton: {
    backgroundColor: '#7e8cff',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  readOnlyField: {
    borderWidth: 1.2,
    borderColor: '#d4d4d8',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginBottom: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  readOnlyText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '500',
  },
  
});
