import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SubDieta from './SubDieta';
import SubReceta from './SubReceta';
import Fondo from '../fondo';

export default function Dieta() {
  const [selectedTab, setSelectedTab] = useState('dieta');

  return (
    <Fondo>
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'dieta' && styles.tabButtonActive,
          ]}
          onPress={() => setSelectedTab('dieta')}
        >
          <Text style={selectedTab === 'dieta' ? styles.tabTextActive : styles.tabText}>
            Dietas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'receta' && styles.tabButtonActive,
          ]}
          onPress={() => setSelectedTab('receta')}
        >
          <Text style={selectedTab === 'receta' ? styles.tabTextActive : styles.tabText}>
            Recetas
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'dieta' ? <SubDieta /> : <SubReceta />}
    </View>
    </Fondo>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    elevation: 6,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#2F5D8C',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  tabTextActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
