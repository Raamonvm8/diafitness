// components/Fondo.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Fondo({ children }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F0FF', 
  },
});
