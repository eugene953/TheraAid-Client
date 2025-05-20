import { Image, Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { Stack, router, Link } from 'expo-router';
import HeaderAbout from '@/components/Headers/HeaderAbout';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const About = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <HeaderAbout /> }} />


      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrapper}>
          <Image source={require('../../assets/images/splash-icon.png')} style={styles.image} />
        </View>

        <View style={styles.wrapper}>
          <Animated.Text style={styles.title} entering={FadeInRight.delay(300).duration(300).springify()}>
            TheraAid v1.0
          </Animated.Text>

          <View style={styles.divider} />

          <View style={styles.sectionContent}>
            <Link href={"Account/PersonInfo" as any} asChild>
              <Pressable style={styles.row}>
                <Text style={styles.rowText}>Developer</Text>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </Pressable>
            </Link>

            <Link href={"Account/PersonInfo" as any} asChild>
              <Pressable style={styles.row}>
                <Text style={styles.rowText}>Partner</Text>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </Pressable>
            </Link>

            <Link href={"Account/PersonInfo" as any} asChild>
              <Pressable style={styles.row}>
                <Text style={styles.rowText}>Accessibility</Text>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </Pressable>
            </Link>

            <Link href={"Account/PersonInfo" as any} asChild>
              <Pressable style={styles.row}>
                <Text style={styles.rowText}>Terms of Use</Text>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </Pressable>
            </Link>

            <Link href={"Account/PersonInfo" as any} asChild>
              <Pressable style={styles.row}>
                <Text style={styles.rowText}>Follow us on social media</Text>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default About;

const styles = StyleSheet.create({

  scrollContainer: {
    flex: 1,
    paddingVertical:50,
    paddingHorizontal:20,
    backgroundColor: Colors.white,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  wrapper: {
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    width: '95%',
    backgroundColor: Colors.gray,
    marginVertical: 16,
  },
  sectionContent: {
    gap: 16,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  rowText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
});
