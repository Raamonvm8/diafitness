import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SubReceta() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CONTENIDO RECETAS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
});
