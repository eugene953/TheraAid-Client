import { StyleSheet, Text, View, Switch, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import HeaderSecurity from '@/components/Headers/HeaderSecurity'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const Security = () => {
  const [rememberMe, setRememberMe] = useState(true);
  const [biometricID, setBiometricID] = useState(false);
  const [faceID, setFaceID] = useState(false);
  const [smsAuth, setSmsAuth] = useState(false);
  const [googleAuth, setGoogleAuth] = useState(false);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <HeaderSecurity /> }} />
      <View style={styles.container}>

        <View style={styles.row}>
          <Text style={styles.label}>Remember me</Text>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            trackColor={{ false: '#ccc', true: Colors.button }}
            thumbColor={rememberMe ? Colors.white : '#f4f3f4'}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Biometric ID</Text>
          <Switch
            value={biometricID}
            onValueChange={setBiometricID}
            trackColor={{ false: '#ccc', true: Colors.button }}
            thumbColor={biometricID ? Colors.white : '#f4f3f4'}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Face ID</Text>
          <Switch
            value={faceID}
            onValueChange={setFaceID}
            trackColor={{ false: '#ccc', true: Colors.button }}
            thumbColor={faceID ? Colors.white : '#f4f3f4'}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>SMS Authenticator</Text>
          <Switch
            value={smsAuth}
            onValueChange={setSmsAuth}
            trackColor={{ false: '#ccc', true: Colors.button }}
            thumbColor={smsAuth ? Colors.white : '#f4f3f4'}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Google Authenticator</Text>
          <Switch
            value={googleAuth}
            onValueChange={setGoogleAuth}
            trackColor={{ false: '#ccc', true: Colors.button }}
            thumbColor={googleAuth ? Colors.white : '#f4f3f4'}
          />
        </View>

        {/* Device Management row */}
        <Pressable style={styles.row}>
          <Text style={styles.label}>Device Management</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </Pressable>

        {/* Change Password Button */}
        <Pressable style={styles.changePasswordButton}>
          <Text style={styles.changePasswordText}>Change Password</Text>
        </Pressable>
      </View>
    </>
  )
}

export default Security

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderColor: '#E5E5E5',
  },
  label: {
    fontSize: 16,
    color: Colors.primary,
  },
  changePasswordButton: {
    marginTop: 40,
    alignSelf: 'center',
    backgroundColor: Colors.button,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  changePasswordText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
});
