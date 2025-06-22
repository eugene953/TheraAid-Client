import { DashboardCard } from '@/components/DashboardCard';
import AdminReportHeader from '@/components/Headers/AdminReportHeader';
import { Colors } from '@/constants/Colors';
import { DATA, ReportData } from '@/data/data';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const routeMap = {
 'User Engagement Report': '/AdminScreen/report/engagement-report',
 'Mood and sentiment Report': '/AdminScreen/report/mood-sentiment-report',
} as const;

type RouteTitle = keyof typeof routeMap;

const AdminReport = () => {


  const router = useRouter();

  const handlePress = (title: RouteTitle) => {
    const route = routeMap[title];
    if (route) {
      router.push(route as any);
    } else {
      console.warn('No route found for', title);
    }
  };


  return (
    <>
     <Stack.Screen options={{headerShown: true, header: () => <AdminReportHeader/> }} />
   
    <View style={styles.container}>
    <FlatList
    data={ReportData}
    keyExtractor={(item) => item.title}
    numColumns={2}
    columnWrapperStyle={styles.row}
    renderItem={({item}) => (
      <DashboardCard
      title={item.title}
      icon={item.icon as any}
      backgroundColor={item.color}
      onPress={()=> handlePress(item.title as RouteTitle)}
      />
    )}
    />
    </View>
    </>
  );
};

export default AdminReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   padding:12,
   backgroundColor: Colors.white,
   top:20,
  },
  row: {
   justifyContent:'space-between'
  }
});
