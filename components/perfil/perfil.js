import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function Perfil() {
  return (
    <ScrollView style={styles.container}>
      

      <View style={styles.avatarContainer}>
        <Image
          source={require('../../assets/perfil/avatar-perfil.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Nombre de Usuario</Text>
        <Text style={styles.email}>usuario@email.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
        <View style={styles.infoItem}>
          <Feather name="calendar" size={20} color="#2F5D8C" />
          <Text style={styles.infoText}>Fecha de nacimiento: 01/01/2000</Text>
        </View>
        <View style={styles.infoItem}>
          <Feather name="map-pin" size={20} color="#2F5D8C" />
          <Text style={styles.infoText}>Ubicación: Las Palmas</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencias</Text>
        <View style={styles.infoItem}>
          <Ionicons name="notifications-outline" size={20} color="#2F5D8C" />
          <Text style={styles.infoText}>Notificaciones activadas</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="color-palette-outline" size={20} color="#2F5D8C" />
          <Text style={styles.infoText}>Tema: Claro</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#2F5D8C" />
          <Text style={styles.editText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F0FF',
  },
  header: {
    backgroundColor: '#2F5D8C',
    paddingVertical: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#C7F2E6',
    borderWidth: 3,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F5D8C',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F5D8C',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C7F2E6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width:0, height:2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  editText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#2F5D8C',
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F5D8C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
