import HeaderAccount from '@/components/Headers/HeaderAccount';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image } from 'react-native';
import { Modal } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
import { useNavigation } from '@react-navigation/native';
import { logout } from '@/redux/slices/loginSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenRootParamList, UserProps } from '@/types/type';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { API_URL } from '@/config';
import { Alert } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import { ScrollView } from 'react-native';

type JWTPayload = {
  id: number;
  role: 'user' | 'admin';
};

type NavigationProp = StackNavigationProp<ScreenRootParamList>;

type User = {
  username: string;
  email: string;
  profile: string;
  phone_number: string;
  gender: string;
};

const account = () => {

const dispatch = useDispatch();
const navigation = useNavigation<NavigationProp>();

const [modalVisible, setModalVisible] = useState(false);

const [token, setToken] = useState<string | null>(null);
const [userId, setUserId] = useState<number | null>(null);

const auth = useSelector((state: RootState) => state.auth);

const [user, setUser] = useState<User>({
  username: '',
  email: '',
  profile: '',
  phone_number: '',
  gender: '',
});

useEffect(() => {
  if (auth.token) {
    try {
      const decoded = jwtDecode<JWTPayload>(auth.token);
      setUserId(decoded.id);
      setToken(auth.token);
    } catch (error) {
      console.error('Token decoding failed:', error);
      Alert.alert('Error', 'Session invalid. Please log in again.');
    }
  }
}, [auth.token]);

useEffect(() => {
  const fetchUser = async () => {
    if (userId && token) {
      try {
        const response = await axios.get(`${API_URL}/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    }
  };

  fetchUser();
}, [userId, token]);

  return (
    <>
    <Stack.Screen options={{headerShown: true, header: () => <HeaderAccount/> }} />
     

     <ScrollView contentContainerStyle={styles.container}>

 {/* Profile Section */}
    <View style={styles.profileSection}>
    <View style={styles.iconContainer}>
    {user.profile ? (
              <Image
                source={{ uri: user.profile }}
                style={{ width: 80, height: 80, borderRadius: 50 }}
              />
            ) : (
              <Ionicons name="person" size={60} color={Colors.gray} />
            )}
    </View>
<View style={styles.profileText}>
<View >
   <Text style={styles.title}>{user.username}</Text>
   <Text style={styles.subtitle}>{user.email}</Text>
   <Link href={"Account/PersonInfo" as any} asChild>
   <Ionicons style={styles.forward} name="chevron-forward" size={24} color="black" />
   </Link>
   </View>
   </View>
   </View>

 {/* Payment Section */}
   <View style={styles.payment}>
    <View style={styles.paymentContent}>
    <View style={styles.iconStar}>
    <Ionicons name="star" size={60}  color='gold'/>
    </View>

    <Link href={"Account/About" as any} asChild>
    <TouchableOpacity style={styles.paymentText}>
   <Text style={styles.title2}>Make Payment</Text>
   <Text style={styles.subtitle2}>Enjoy all benefits without restrictions</Text>
   <Ionicons style={styles.forward} name="chevron-forward" size={24} color="white" />
   </TouchableOpacity>
   </Link>

   </View>  
   </View>

 {/* General Section */}
    <View style={styles.section}>
    <View style={styles.inline}>
      <Text style={styles.sectionTitle}>General</Text>
    <View style={styles.divider}/> 
    </View>
    </View>
    <View style={styles.sectionContent}>
    <Link href={"Account/PersonInfo" as any} asChild>
    <Pressable style={styles.row}
      // onPress={() => router.push('/PersonInfo')}
    >
    <Ionicons name='person-outline' size={22} color="black" />
      <Text style={styles.rowText}>Person Info</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
    </Link>
    <Link href={"Account/Security" as any} asChild>
    <Pressable style={styles.row}>
    <Ionicons name='shield-outline' size={22} color="black" />
      <Text style={styles.rowText}>Security</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
    </Link>
    </View>

     {/* About Section */}
    <View style={styles.section}>
      <View style={styles.inline}>
      <Text style={styles.sectionTitle}>About</Text>
    <View style={styles.divider}/> 
    </View>
    </View>
    <View style={styles.sectionContent}>
  
    <Link href={"Account/HelpCenter" as any} asChild>
    <Pressable style={styles.row}>
    <Ionicons name="help-circle-outline" size={24} color="black" />
      <Text style={styles.rowText}>Help Center</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
    </Link>

    <Link href={"Account/PrivacyPolicy" as any} asChild>
    <Pressable style={styles.row}>
    <Ionicons name="document-text-outline" size={24} color="black" />
      <Text style={styles.rowText}>Privacy Policy</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
</Link>

<Link href={"Account/About" as any} asChild>
    <Pressable style={styles.row}>
    <Ionicons name="information-circle-outline" size={24} color="black" />
      <Text style={styles.rowText}>About TheraAid</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
    </Link>

    <Pressable style={styles.row} onPress={() => setModalVisible(true)}>
  <Ionicons name="log-out-outline" size={24} color="black" />
  <Text style={styles.rowText}>Logout</Text>
</Pressable>
   

{/* handle logout functionality*/}
<Modal
  transparent
  animationType="slide"
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={{ flex: 1,justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)'}}>
    <View style={{   backgroundColor: Colors.white, padding: 20, borderTopLeftRadius: 20,borderTopRightRadius: 20,alignItems: 'center'}}>
      <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>Logout</Text>
      <Text style={{ marginVertical: 20 }}>Are you sure you want to log out?</Text>
      
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity style={{ flex: 1, backgroundColor: '#e0e0e0', padding: 12, borderRadius: 30, alignItems: 'center' }}
          onPress={() => setModalVisible(false)} >
          <Text style={{ color: Colors.primary }}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1, backgroundColor: '#7e8cff', padding: 12, borderRadius: 30, alignItems: 'center'}}
          onPress={() => {
            setModalVisible(false);
            dispatch(logout());
            navigation.reset({
              index: 0,
              routes: [{ name: 'WelcomeScreen' }],
            });
        
            console.log('User logged out');
            
          }}
        >
          <Text style={{ color: 'white' }}>Yes, Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
    paddingTop: 30,
    minHeight: '100%', 
},
profileSection:{
  top: 10,
  flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
},
iconContainer: {
  backgroundColor: '#f0f0f0',
  padding: 5,
  borderRadius: 50,
  marginRight: 16,
},
profileText:{
  flex:1
  },

title: {
  fontSize: 16,
  color: Colors.primary,
  fontWeight: 'bold', 
},
subtitle: {
  color: Colors.gray,
  fontSize:12,
},
forward:{
  top:-20,
  marginLeft: 170,
},
forwardMenu:{
 
},
payment: {
  backgroundColor: '#7e8cff',
  borderRadius: 10,
  padding: 16,
  marginBottom: 24,
},
paymentContent:{
  flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconStar: {
    padding: 6,
    marginRight: 16,
    borderRadius: 30,
    backgroundColor: Colors.white,
  },
  paymentText:{
    flex: 1,
  },
  title2: {
    fontSize: 16,
    color: Colors.background,
    fontWeight: 'bold', 
  },
  subtitle2: {
    color: Colors.background,
    fontSize:10,
  },

  section: {
    marginBottom: 24,
  },
  inline:{
    flexDirection:'row',
  },
  sectionTitle: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: 'bold',
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: Colors.gray,
    marginTop: 10,
    left:20,
  },
  sectionContent: {
    gap: 16,
    marginBottom:5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: -2,
    paddingHorizontal: 10
  },
  rowText: {
    flex: 1,
    marginLeft: 10,
    fontWeight: 'bold',
  },

});

export default account;
