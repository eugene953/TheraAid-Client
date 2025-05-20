import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';

interface Props {
  visible: boolean;
  onClose: () => void;
  message?: string;
  subMessage?: string;
}

const ResetPasswordModal: React.FC<Props> = ({
  visible,
  onClose,
  message = 'Reset Password Successful!',
  subMessage = 'Please wait...\nYou will be directed to the Welcomepage.',
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
        navigation.navigate('signin'  as never); 
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Image
            source={require('../../assets/images/PasswordResetSuccess.png')}
            style={styles.logo}
          />
          <View style={styles.successMessage}>
            <Text style={styles.successTitle}>{message}</Text>
            <Text style={styles.successSubtitle}>{subMessage}</Text>

            <View style={styles.spinnerWrapper}>
              <ActivityIndicator size="small" color= '#7e8cff' />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 350,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  successMessage: {
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#5BD97E',
  },
  successSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  spinnerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  arrowIcon: {
    marginLeft: 10,
  },
});

export default ResetPasswordModal;
