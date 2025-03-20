import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Fondo from './fondo';

export default function HomePage() {
  return (
    <Fondo>
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.main}>
            <View style={styles.caloriesContainer}>
                <View style={styles.circle}>
                    <Text style={styles.kcalMain}>1642</Text>
                    <Text style={styles.kcalSub}>/1921 kcal</Text>
                </View>
            </View>

            <View style={styles.waterContainer}>
                {[...Array(8)].map((_, i) => (
                    <FontAwesome5 key={i} name="glass-whiskey" size={35} color="lightblue" style={{ marginHorizontal: 4 }} />
                ))}
            </View>


            <View style={styles.card}>
                <Text style={styles.cardText}>+ Desayuno</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardText}>+ Almuerzo</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardText}>+ Merienda</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardText}>+ Cena</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardText}>+ Ejercicio</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardText}>+ Snacks</Text>
            </View>
       </ScrollView>

      
    </View>
    </Fondo>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1}, 
  
  main: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  caloriesContainer: {
    marginBottom: 20,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#2F5D8C', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  kcalMain: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  kcalSub: {
    fontSize: 16,
    color: 'white',
  },
  waterContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '85%',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
