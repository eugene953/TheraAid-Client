// components/Modals/ShareModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

const ShareModal = ({ visible, onClose, message }: ShareModalProps) => {

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }

    onClose(); 
  };

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Share This Message</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>Share Now</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
  },
  shareButton: {
    backgroundColor: '#201D67',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  closeButtonText: {
    color: '#444',
  },
});

export default ShareModal;
