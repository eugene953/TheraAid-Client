import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import HeaderAllUser from '@/components/Headers/HeaderAllUser';
import { Colors } from '@/constants/Colors';
import axios from 'axios';
import { API_URL } from '@/config';
import { UserProps } from '@/types/type';
import { Ionicons } from '@expo/vector-icons';

export default function AllUser() {
  const [searchQuery, setSearchQuery] = useState('');

  const [users, setUsers] = useState<UserProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/getAllUsers`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

const handleDelete = async (userId: string) => {
  Alert.alert('Confirm Delete', 'Are you sure you want to delete user?', [
{text: 'cancel', style:'cancel'},
{
  text: 'Delete',
  style: 'destructive',
  onPress: async () => {
    try {
      await axios.delete(`${API_URL}/api/deleteUser/${userId}`);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Failed to delete user:', error);
      Alert.alert('Error', 'Could not delete user');
    }
  },
},
]);
};

const handleView = (user: UserProps) => {
  router.push({ pathname: '/Account/PersonInfo', params: { id: user.id } })
}

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <HeaderAllUser /> }} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
           <TextInput
            style={styles.searchInput}
            placeholder="Search by username"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
             />
        </View>


        {users
      .filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
       )
       .map((user) => (
            <View key={user.id} style={styles.card}>
                <View style={styles.iconContainer}>
                {user.profile ? (
                  <Image
                    source={{ uri: user.profile }}
                    style={styles.profileImage}
                  />
                ) : (
                  <Ionicons name="person" size={60} color={Colors.gray} />
                )}
                </View>
              <Text style={styles.username}>👤 {user.username}</Text>
              <Text style={styles.detail}>📧 {user.email}</Text>
              <Text style={styles.detail}>📞 {user.phone_number}</Text>
              
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleView(user)} style={styles.iconBtn}>
                  <Ionicons name="eye" size={24} color={Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(user.id)} style={styles.iconBtn}>
                  <Ionicons name="trash" size={24} color={Colors.red} />
                </TouchableOpacity>
               </View>

            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
  },
  container: {
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  card: {
    backgroundColor: Colors.lightGray,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    position:'relative'
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: Colors.primary,
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: Colors.white,
  },
  actions: {
    position: 'absolute',
  top: 90,
  right: 10,
  flexDirection: 'row',
  gap: 10,
  },
  iconBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  
  
});
