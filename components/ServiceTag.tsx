import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

type Props = {
  label: string;
};

const ServiceTag = ({ label }: Props) => (
  <View style={styles.tag}>
    <Text style={styles.text}>{label}</Text>
  </View>
);

export default ServiceTag;

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#e6f0ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 6,
  },
  text: {
    fontSize: 13,
    color: '#004080',
  },
});