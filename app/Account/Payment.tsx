import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import HeaderMakePayment from '@/components/Headers/HeaderMakePayment';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';


const paymentMethods = [
  {
    id: '1',
    name: 'MTN Mobile Money (MoMo)',
    image: require('../../assets/images/MTN.jpg'),
  },
  {
    id: '2',
    name: 'Orange Money',
    image: require('../../assets/images/Orange.png'),
  },
  {
    id: '3',
    name: 'UBA Cameroon',
     image: require('../../assets/images/UBA.jpg'),
  },
];

const Payment = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <HeaderMakePayment />, }}/>
      <View style={styles.container}>

        <FlatList
          data={paymentMethods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.paymentOption,
                selected === item.id && styles.selectedOption,
              ]}
              onPress={() => setSelected(item.id)}
            >
             <Image source={item.image} style={styles.logo} />
              <Text style={styles.paymentText}>{item.name}</Text>
              <Ionicons
                name={selected === item.id ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          )}
        />

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.addPayment}>
          <Text style={styles.addPaymentText}>+ Add New Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueBtn}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
      
      </View>
    </>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    top:20,
  },
  paymentOption: {
    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 20,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#6366f1',
  },
   logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  buttons:{
top:-200,
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  addPayment: {
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
  },
  addPaymentText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '500',
  },
  continueBtn: {
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
