
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
import HeaderAccount from '@/components/Headers/HeaderAccount';

type JWTPayload = {
  id: number;
  role: 'user' | 'admin';
};

type NavigationProp = StackNavigationProp<ScreenRootParamList>;

type Admin = {
  admin_name: string;
  email: string;
  password: string;
};

const Adminaccount = () => {

const dispatch = useDispatch();
const navigation = useNavigation<NavigationProp>();

const [modalVisible, setModalVisible] = useState(false);

const [token, setToken] = useState<string | null>(null);
const [userId, setUserId] = useState<number | null>(null);

const auth = useSelector((state: RootState) => state.auth);

const [user, setUser] = useState<Admin>({
  admin_name: '',
  email: '',
  password: '',
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
        const response = await axios.get(`${API_URL}/admin/${userId}`, {
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
  <Ionicons name="person" size={60} color={Colors.gray} />

    </View>
<View style={styles.profileText}>
<View >
   <Text style={styles.title}>{user.admin_name}</Text>
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
      <Text style={styles.rowText}>Admin Info</Text>
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

{/* Account Settings Section */}
<View style={styles.section}>
  <View style={styles.inline}>
    <Text style={styles.sectionTitle}>Account Settings</Text>
    <View style={styles.divider}/> 
  </View>
</View>
<View style={styles.sectionContent}>
  <Link href={"Account/ChangePassword"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='key-outline' size={22} color="black" />
      <Text style={styles.rowText}>Change Password</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
  <Link href={"Account/UpdateEmail"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='mail-outline' size={22} color="black" />
      <Text style={styles.rowText}>Update Email</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
  <Link href={"Account/AdminRoles"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='people-outline' size={22} color="black" />
      <Text style={styles.rowText}>Manage Roles & Permissions</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
</View>

{/* App Management Section */}
<View style={styles.section}>
  <View style={styles.inline}>
    <Text style={styles.sectionTitle}>App Management</Text>
    <View style={styles.divider}/> 
  </View>
</View>
<View style={styles.sectionContent}>
  <Link href={"Account/ViewLogs"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='list-outline' size={22} color="black" />
      <Text style={styles.rowText}>View Logs</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
  <Link href={"Account/Notifications"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='notifications-outline' size={22} color="black" />
      <Text style={styles.rowText}>Manage Notifications</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
  <Link href={"Account/FeatureToggles"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='toggle-outline' size={22} color="black" />
      <Text style={styles.rowText}>Feature Toggles</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
</View>

{/* Data Management Section */}
<View style={styles.section}>
  <View style={styles.inline}>
    <Text style={styles.sectionTitle}>Data Management</Text>
    <View style={styles.divider}/> 
  </View>
</View>
<View style={styles.sectionContent}>
  <Link href={"Account/ExportFeedback"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='download-outline' size={22} color="black" />
      <Text style={styles.rowText}>Export User Feedback</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
  <Link href={"Account/BackupData" as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='cloud-upload-outline' size={22} color="black" />
      <Text style={styles.rowText}>Backup Data</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
  <Link href={"Account/RestorePoints"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='refresh-outline' size={22} color="black" />
      <Text style={styles.rowText}>Restore Points</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
</View>

{/* System Settings Section */}
<View style={styles.section}>
  <View style={styles.inline}>
    <Text style={styles.sectionTitle}>System Settings</Text>
    <View style={styles.divider}/> 
  </View>
</View>
<View style={styles.sectionContent}>
  <Link href={"Account/AppVersion"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='apps-outline' size={22} color="black" />
      <Text style={styles.rowText}>App Version</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
  <Link href={"Account/APIHealth" as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='pulse-outline' size={22} color="black" />
      <Text style={styles.rowText}>API Health Check</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
  <Link href={"Account/ClearCache"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='trash-outline' size={22} color="black" />
      <Text style={styles.rowText}>Clear App Cache</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
</View>

{/* Security Settings Section */}
<View style={styles.section}>
  <View style={styles.inline}>
    <Text style={styles.sectionTitle}>Security</Text>
    <View style={styles.divider}/> 
  </View>
</View>
<View style={styles.sectionContent}>
  <Link href={"Account/2FA" as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='lock-closed-outline' size={22} color="black" />
      <Text style={styles.rowText}>Two-Factor Authentication</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
  <Link href={"Account/LoginLogs"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='document-outline' size={22} color="black" />
      <Text style={styles.rowText}>Admin Login Logs</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
  <Link href={"Account/SessionTimeout"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='time-outline' size={22} color="black" />
      <Text style={styles.rowText}>Session Timeout</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
</View>

{/* Support & Documentation */}
<View style={styles.section}>
  <View style={styles.inline}>
    <Text style={styles.sectionTitle}>Support & Documentation</Text>
    <View style={styles.divider}/> 
  </View>
</View>
<View style={styles.sectionContent}>
  <Link href={"Account/HelpCenter"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='help-outline' size={22} color="black" />
      <Text style={styles.rowText}>Help Center</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
  <Link href={"Account/APIDocs"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='code-slash-outline' size={22} color="black" />
      <Text style={styles.rowText}>API Documentation</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
  <Link href={"Account/ContactSupport"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='chatbubble-ellipses-outline' size={22} color="black" />
      <Text style={styles.rowText}>Contact Support</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
</View>

{/* Legal */}
<View style={styles.section}>
  <View style={styles.inline}>
    <Text style={styles.sectionTitle}>Legal</Text>
    <View style={styles.divider}/> 
  </View>
</View>
<View style={styles.sectionContent}>
  <Link href={"Account/PrivacyPolicy"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name="document-text-outline" size={24} color="black" />
      <Text style={styles.rowText}>Privacy Policy</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
  <Link href={"Account/TermsOfService"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name="document-outline" size={24} color="black" />
      <Text style={styles.rowText}>Terms of Service</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
  </Link>
</View>

{/* Danger Zone */}
<View style={styles.section}>
  <View style={styles.inline}>
    <Text style={[styles.sectionTitle, { color: 'red' }]}>Danger Zone</Text>
    <View style={styles.divider}/> 
  </View>
</View>
<View style={styles.sectionContent}>
  <Link href={"Account/ResetDatabase"as any} asChild>
    <Pressable style={styles.row}>
      <Ionicons name='alert-circle-outline' size={22} color="red" />
      <Text style={[styles.rowText, { color: 'red' }]}>Reset Database</Text>
    </Pressable>
  </Link>
  <Link href={"Account/DeactivateAccount" as any}  asChild>
    <Pressable style={styles.row}>
      <Ionicons name='close-circle-outline' size={22} color="red" />
      <Text style={[styles.rowText, { color: 'red' }]}>Deactivate Admin Account</Text>
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

export default Adminaccount;
