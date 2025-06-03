import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_AUTH } from '../FirebaseConfig';

export default function Header() {
  const navigation = useNavigation();

  const currentRouteName = useNavigationState((state) => {
    if (!state || !state.routes || state.routes.length === 0) return 'Hoy';
    const route = state.routes[state.index];
    return route?.name;
  });

  const nombreHeader = () => {
    switch (currentRouteName) {
      case 'Hoy': return 'Hoy';
      case 'Glucosa': return 'Glucosa';
      case 'Alimentación': return 'Alimentación';
      case 'Calendario': return 'Calendario';
      case 'Perfil': return 'Perfil';

      default: return '';
    }
  };

  const goToPerfil = () => {
    navigation.navigate('Perfil'); 
  };

  const handleLogout = () => {
    FIREBASE_AUTH.signOut();
  };

  const handleEditarPerfil = () => {
    console.log('Editar perfil'); 
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{nombreHeader()}</Text>

      <View style={styles.rightButtons}>
        {currentRouteName === 'Perfil' ? (
          <>
            <TouchableOpacity onPress={handleEditarPerfil} style={styles.actionButton}>
              <Text style={styles.actionText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.actionButton}>
              <Text style={styles.actionText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={goToPerfil}>
            <Ionicons name="person-circle-outline" size={40} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#2F5D8C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    marginLeft: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  actionText: {
    color: '#2F5D8C',
    fontWeight: 'bold',
  },
});
