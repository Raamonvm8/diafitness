// Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigationState } from '@react-navigation/native';

export default function Header() {
  const currentRouteName = useNavigationState((state) => {
    if (!state || !state.routes || state.routes.length === 0) return 'Inicio';
    const route = state.routes[state.index];
    return route?.name;
  });

  const nombreHeader = () => {
    switch (currentRouteName) {
      case 'Inicio': return 'Inicio';
      case 'Glucosa': return 'Glucosa';
      case 'Dieta': return 'Dieta';
      case 'Calendar': return 'Calendario';
      case 'Perfil': return 'Perfil';
      default: return '';
    }
  };

  return (
    <View style={styles.headerInner}>
        <Text style={styles.headerText}>{nombreHeader()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  
  headerInner: {
    backgroundColor: '#2F5D8C',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    padding: 10,
  },
});
