import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import HeaderEngagementReport from '@/components/Headers/HeaderEngagementReport'; 
import axios from 'axios';
import { API_URL } from '@/config';
import { generateReportPDF, ReportItem } from '@/Utils/generateReportPDF';

export default function EngagementReport() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEngagementReport = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/userEngagement`); 
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching engagement report:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEngagementReport();
  }, []);

  const renderItem = ({ item, index }: any) => (
   <View style={styles.card}> 
  <Text style={styles.username}>{index + 1}. {item.username}</Text>
  <Text style={styles.meta}>Total Sessions: {item.total_sessions}</Text>
  <Text style={styles.meta}>Avg. Duration: {item.avg_duration_minutes} min</Text>
</View>

  );

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <HeaderEngagementReport /> }} />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#6366f1" />
        ) : (
           <>
          <FlatList
            data={reportData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

           <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button} onPress={() => generateReportPDF(reportData, 'weekly')}>
                <Text style={styles.buttonText}>Generate Weekly Report</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => generateReportPDF(reportData, 'monthly')}>
                <Text style={styles.buttonText}>Generate Monthly Report</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 20,
  },
 card: {
  backgroundColor: '#ffffff',
  padding: 16,
  borderRadius: 16,
  marginBottom: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 4,
  borderLeftWidth: 5,
  borderLeftColor: '#2C3E50',
},
username: {
  fontSize: 18,
  fontWeight: '700',
  marginBottom: 6,
  color: '#2C3E50',
},
meta: {
  fontSize: 14,
  color: '#555',
  marginBottom: 2,
},
  buttonGroup: { 
    marginTop: 20,
    gap: 12,
  },
  button: {
    backgroundColor: '#6366f1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
