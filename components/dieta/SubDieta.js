import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function SubDieta() {
  return (
    <ScrollView>
        <View style={styles.container}>
            <Text style={styles.text}>CONTENIDO DIETAS</Text>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  
  main: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  text: {
    fontSize: 16,
  },
});
