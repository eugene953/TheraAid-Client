import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { Colors } from '@/constants/Colors';

type ClearHistoryModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const ClearHistoryModal: React.FC<ClearHistoryModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <View style={styles.bottomSheet}>
        <Text style={styles.modalTitle}>Clear All History</Text>
        <Text style={styles.modalSubtitle}>
          Are you sure you want to clear all history?
        </Text>
        <View style={styles.modalButtonRow}>
          <TouchableOpacity style={ styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.clearButton} onPress={onConfirm}>
            <Text style={styles.clearButtonText}>Yes, Clear All History</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    marginRight: 12,
  },
  clearButton: {
    width: 180,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#7e8cff',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default ClearHistoryModal;
