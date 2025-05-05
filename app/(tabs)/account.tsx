import HeaderAccount from '@/components/HeaderAccount';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

const account = () => {
  return (
    <>
    <Stack.Screen options={{headerShown: true, header: () => <HeaderAccount/> }} />
     
     <View style={styles.container}>

 {/* Profile Section */}
    <View style={styles.profileSection}>
    <View style={styles.iconContainer}>
    <Ionicons name="person" size={60}  color={Colors.gray}  />
    </View>
<View style={styles.profileText}>
<View >
   <Text style={styles.title}>Nfoua Eugene</Text>
   <Text style={styles.subtitle}>nfouaeugene953@gmail.com</Text>
   <Ionicons style={styles.forward} name="chevron-forward" size={24} color="black" />
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
    <Link href={"Account/Feedback" as any} asChild>
    <Pressable style={styles.row}>
    <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
      <Text style={styles.rowText}>Feedback</Text>
      <Ionicons style={styles.forwardMenu} name="chevron-forward" size={24} color="black" />
    </Pressable>
    </Link>
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

    <Link href={"Account/Logout" as any} asChild>
    <Pressable style={styles.row}>
    <Ionicons name="log-out-outline" size={24} color="black" />
      <Text style={styles.rowText}>Logout</Text>
    </Pressable>
    </Link>
   
    </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white, 
},
profileSection:{
  top: 10,
  flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
},
iconContainer: {
  backgroundColor: '#f0f0f0',
  padding: 12,
  borderRadius: 45,
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
  marginLeft: 190,
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
