import HeaderPrivacy from '@/components/Headers/HeaderPrivacypolicy';
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

const PrivacyPolicy = () => {

  return (
    <>
    <Stack.Screen options={{ headerShown: true, header: () => <HeaderPrivacy /> }} />

   <SafeAreaView style={styles.safeArea}> 
    <ScrollView style={styles.container}
    contentContainerStyle={styles.contentContainer}
     showsVerticalScrollIndicator={false}
     >

      <Text style={styles.paragraph}>
        At TheraAid, we respect and protect the privacy of our users. This Privacy Policy outlines the types of personal information we collect, how we use it, and how we protect your information.
      </Text>

      <Text style={styles.sectionTitle}>Information We Collect</Text>
      <Text style={styles.paragraph}>
        When you use our app, we may collect the following types of personal information:
      </Text>
      <Text style={styles.bullet}>• <Text style={styles.bold}>Device Information:</Text> We may collect information about the type of device you use, its operating system, and other technical details to help us improve our app.</Text>
      <Text style={styles.bullet}>• <Text style={styles.bold}>Usage Information:</Text> We may collect information about how you use our app, such as which features you use and how often you use them.</Text>
      <Text style={styles.bullet}>• <Text style={styles.bold}>Personal Information:</Text> We may collect personal information, such as your name, email address, or phone number, if you choose to provide it to us.</Text>

      <Text style={styles.sectionTitle}>How We Use Your Information</Text>
      <Text style={styles.paragraph}>
        We use your information for the following purposes:
      </Text>
      <Text style={styles.bullet}>• <Text style={styles.bold}>To provide and improve our app:</Text> We use your information to provide and improve our app, including to personalize your experience and to analyze how our app is used.</Text>
      <Text style={styles.bullet}>• <Text style={styles.bold}>To communicate with you:</Text> We may use your information to communicate with you about our app, including to provide you with updates and news about our app.</Text>
      <Text style={styles.bullet}>• <Text style={styles.bold}>To protect our rights and the rights of others:</Text> We may use your information to protect our rights and the rights of others, such as to investigate and prevent fraud or other illegal activity.</Text>
    </ScrollView>
    </SafeAreaView>
    </>
 
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40, 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginLeft: 8,
    marginBottom: 6,
  },
  bold: {
    fontWeight: 'bold',
    color: '#222',
  },
});
