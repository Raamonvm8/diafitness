import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function SubDieta() {
  return (
    <><TouchableOpacity style={styles.crearButton}>
      <Text style={styles.crearButtonText}>+ Crear</Text>
    </TouchableOpacity>
    <ScrollView style={styles.container}>

        <TouchableOpacity style={styles.dietaItemActual}>
          <Text style={styles.dietaTextActual}>Actual</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>
        {["13/02/2023", "20/01/2023", "8/12/2022", "13/09/2022", "13/09/2022", "13/09/2022", "13/09/2022", "13/09/2022"].map((date, index) => (
          <TouchableOpacity key={index} style={styles.dietaItemAnterior}>
            <Text style={styles.dietaText}>Anterior</Text>
            <Text style={styles.dietaDate}>{date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  crearButton: {
    backgroundColor: '#C7F2E6',
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 12,
    width: 80
  },
  crearButtonText: {
    color: '#2F5D8C',
    fontSize: 15,
    fontWeight: 'bold',
  },
  dietaItemActual: {
    backgroundColor: '#2F5D8C',
    padding: 15,
    borderRadius: 8,
    marginTop: 10
  },
  dietaItemAnterior: {
    backgroundColor: '#4A7BA7',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  dietaText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dietaTextActual: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  dietaDate: {
    color: 'white',
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    margin: 30,
  },
  
});
