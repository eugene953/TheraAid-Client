import { DashboardCard } from '@/components/DashboardCard';
import AdminHeader from '@/components/Headers/AdminHeader';
import { Colors } from '@/constants/Colors';
import { DATA } from '@/data/data';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

  
  const routeMap = {
    'Add Admin': '/AdminScreen/home/add-admin',
    'Register User': '/signup',
    'All Users': '/AdminScreen/home/all-users',
    'Reminders': '/AdminScreen/home/reminders',
    'Feedback': '/AdminScreen/home/feedback',
    'Update Mental Health Resources': '/AdminScreen/home/update-mental-health-resource',
  } as const;

  type RouteTitle = keyof typeof routeMap;

const AdminHome = () => {

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
     <Stack.Screen options={{headerShown: true, header: () => <AdminHeader/> }} />
   
    <View style={styles.container}>
    <FlatList
    data={DATA}
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

export default AdminHome;

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
