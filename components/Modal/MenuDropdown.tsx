import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

const MenuDropdown = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={() => setVisible(true)} style={styles.iconButton}>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </Pressable>

      <Modal
        transparent
        animationType="slide"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.backdrop} onPress={() => setVisible(false)} />
          <View style={styles.slidePanel}>
            <Text style={styles.title}>Menu</Text>

            <Link href="/Dropdown/SetReminder" asChild>
              <Pressable style={styles.menuItem}>
                <Ionicons name="alarm-outline" size={20} color="black" style={styles.icon} />
                <Text style={styles.itemText}>Set Reminder</Text>
              </Pressable>
            </Link>

            <Link href="/Dropdown/Feedback" asChild>
              <Pressable style={styles.menuItem}>
                <Ionicons name="chatbox-ellipses-outline" size={20} color="black" style={styles.icon} />
                <Text style={styles.itemText}>Feedback</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  iconButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backdrop: {
    flex: 1,
  },
  slidePanel: { 
    width: screenWidth * 0.75,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  icon: {
    width: 20,
  },
});

export default MenuDropdown;
