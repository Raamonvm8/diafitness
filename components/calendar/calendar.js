import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Fondo from '../fondo';

export default function Calendar() {
  return (
    <Fondo>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.main}>
        <Text>CALENDAR</Text>
      </ScrollView>
    </View>
    </Fondo>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center'}, 
  
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
