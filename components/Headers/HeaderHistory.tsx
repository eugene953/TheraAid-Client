import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HeaderHistoryProps = {
  onSearchPress: () => void;
   onTrashPress: () => void;
};

const HeaderHistory: React.FC<HeaderHistoryProps> = ({ onSearchPress,   onTrashPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Image
        source={require('../../assets/images/splash-icon.png')}
        style={styles.logo}
      />

      <Text style={styles.header}>History</Text>

    <View style={styles.iconRow}>
      <View style={{ flexDirection: 'row', top:5 }}>
        <TouchableOpacity onPress={onSearchPress}>
          <Ionicons name="search-outline" size={24} color={Colors.primary} style={{ marginRight: 16 }}/>
        </TouchableOpacity>

          <TouchableOpacity onPress={onTrashPress} style={styles.buttonTouch}>
          <Ionicons name="trash-outline"size={24} color={Colors.primary}    style={{ marginRight: 16 }}/>
        </TouchableOpacity>
       </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
      paddingVertical: 8,
    paddingHorizontal: 10,
    top: 20,
    backgroundColor: Colors.white,
    marginBottom:20,
  },
  logo: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  header: {
    left: 20,
    fontSize: 23,
    fontWeight: 'bold',
  },
  headerIcon: {
    flexDirection: 'row',
    gap: 10,
  },
    iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonTouch: {
    padding: 4,
  },
});

export default HeaderHistory;
