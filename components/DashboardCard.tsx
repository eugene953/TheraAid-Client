
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DashboardCardProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  onPress: () => void;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  backgroundColor,
  onPress,
}) => {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor }]} onPress={onPress}>
      <Ionicons name={icon} size={36} color="white" />
      <Text style={styles.title}>{title}</Text>
      <Ionicons name="arrow-forward" size={20} color="white" style={styles.arrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  arrow: {
    alignSelf: 'flex-end',
  },
});
